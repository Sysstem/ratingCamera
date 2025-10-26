// Утилиты для реального анализа качества изображений

interface ImageData {
	data: Uint8ClampedArray;
	width: number;
	height: number;
}

/**
 * Загружает изображение и возвращает ImageData
 */
export async function loadImageData(file: File): Promise<ImageData> {
	return new Promise((resolve, reject) => {
		const img = new window.Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");

			if (!ctx) {
				reject(new Error("Не удалось получить контекст canvas"));
				return;
			}

			ctx.drawImage(img, 0, 0);
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			resolve({
				data: imageData.data,
				width: canvas.width,
				height: canvas.height,
			});
		};

		img.onerror = () => reject(new Error("Ошибка загрузки изображения"));
		img.src = URL.createObjectURL(file);
	});
}

/**
 * Анализ резкости изображения с использованием Laplacian variance
 * Высокая дисперсия = высокая резкость
 */
export function calculateSharpness(imageData: ImageData): number {
	const { data, width, height } = imageData;

	// Преобразуем в grayscale
	const gray: number[] = [];
	for (let i = 0; i < data.length; i += 4) {
		gray.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
	}

	// Применяем оператор Лапласа
	let laplacianSum = 0;
	let count = 0;

	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			const idx = y * width + x;

			// Ядро Лапласа 3x3
			const laplacian =
				gray[idx - width] + // верх
				gray[idx - 1] + // лево
				-4 * gray[idx] + // центр
				gray[idx + 1] + // право
				gray[idx + width]; // низ

			laplacianSum += laplacian * laplacian;
			count++;
		}
	}

	// Вычисляем дисперсию
	const variance = laplacianSum / count;

	// Нормализуем к шкале 0-100
	const normalized = Math.min(100, (100 * Math.log1p(variance)) / 10);

	return normalized;
}
/**
 * Оценка шума JPEG изображения
 * Анализирует однородные области и учитывает JPEG артефакты
 * Возвращает оценку 0-100 (0 = много шума, 100 = мало шума)
 */

interface NoiseMetrics {
	highFreqNoise: number;
	localVariance: number;
	blockingArtifacts: number;
}
export function calculateNoise(imageData: ImageData): number {
	const { data, width, height } = imageData;

	// Шаг 1: Находим однородные области изображения
	const homogeneousBlocks = findHomogeneousBlocks(imageData);

	if (homogeneousBlocks.length === 0) {
        return 5; // Очень шумное изображение
    }

	// Шаг 2: Анализируем шум в этих областях
	const noiseMetrics = analyzeNoiseInBlocks(homogeneousBlocks, data, width);

	// Шаг 3: Комбинируем метрики для итоговой оценки
	return calculateFinalNoiseScore(noiseMetrics);
}

/**
 * Находит однородные блоки 4x4 пикселя без резких границ
 */
function findHomogeneousBlocks(
	imageData: ImageData,
): { x: number; y: number }[] {
	const { data, width, height } = imageData;
	const blocks: { x: number; y: number }[] = [];
	const blockSize = 4;
	const maxVariance = 50; // Порог для однородности

	for (let y = 0; y < height - blockSize; y += blockSize) {
		for (let x = 0; x < width - blockSize; x += blockSize) {
			const variance = calculateBlockVariance(data, width, x, y, blockSize);
			if (variance < maxVariance) {
				blocks.push({ x, y });
			}
		}
	}

	// Возвращаем максимум 20 самых однородных блоков
	return blocks
		.sort(
			(a, b) =>
				calculateBlockVariance(data, width, a.x, a.y, blockSize) -
				calculateBlockVariance(data, width, b.x, b.y, blockSize),
		)
		.slice(0, 20);
}

/**
 * Вычисляет дисперсию яркости в блоке
 */
function calculateBlockVariance(
	data: Uint8ClampedArray,
	width: number,
	startX: number,
	startY: number,
	size: number,
): number {
	let sum = 0;
	let sumSq = 0;
	let count = 0;

	for (let y = startY; y < startY + size; y++) {
		for (let x = startX; x < startX + size; x++) {
			const idx = (y * width + x) * 4;
			const luminance =
				0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
			sum += luminance;
			sumSq += luminance * luminance;
			count++;
		}
	}

	const mean = sum / count;
	return sumSq / count - mean * mean;
}

/**
 * Анализирует шум в найденных однородных блоках
 */
function analyzeNoiseInBlocks(
	blocks: { x: number; y: number }[],
	data: Uint8ClampedArray,
	width: number,
): NoiseMetrics {
	let totalHighFreqNoise = 0;
	let totalLocalVariance = 0;
	let totalBlockingArtifacts = 0;
	const blockSize = 4;

	for (const block of blocks) {
		// Метрика 1: Высокочастотный шум (разность с соседями)
		totalHighFreqNoise += calculateHighFrequencyNoise(
			data,
			width,
			block.x,
			block.y,
			blockSize,
		);

		// Метрика 2: Локальная дисперсия внутри блока
		totalLocalVariance += calculateBlockVariance(
			data,
			width,
			block.x,
			block.y,
			2,
		);

		// Метрика 3: JPEG блочность (разность на границах блоков)
		totalBlockingArtifacts += calculateBlockingArtifacts(
			data,
			width,
			block.x,
			block.y,
			blockSize,
		);
	}

	return {
		highFreqNoise: totalHighFreqNoise / blocks.length,
		localVariance: totalLocalVariance / blocks.length,
		blockingArtifacts: totalBlockingArtifacts / blocks.length,
	};
}

/**
 * Вычисляет высокочастотный шум через разности соседних пикселей
 */
function calculateHighFrequencyNoise(
	data: Uint8ClampedArray,
	width: number,
	startX: number,
	startY: number,
	size: number,
): number {
	let totalDifference = 0;
	let count = 0;

	for (let y = startY + 1; y < startY + size - 1; y++) {
		for (let x = startX + 1; x < startX + size - 1; x++) {
			const idx = (y * width + x) * 4;
			const centerLum =
				0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];

			// Сравниваем с 4-связными соседями
			const neighbors = [
				(y * width + (x - 1)) * 4, // left
				(y * width + (x + 1)) * 4, // right
				((y - 1) * width + x) * 4, // top
				((y + 1) * width + x) * 4, // bottom
			];

			for (const nIdx of neighbors) {
				const neighborLum =
					0.299 * data[nIdx] + 0.587 * data[nIdx + 1] + 0.114 * data[nIdx + 2];
				totalDifference += Math.abs(centerLum - neighborLum);
				count++;
			}
		}
	}

	return count > 0 ? totalDifference / count : 0;
}

/**
 * Оценивает JPEG блочность (разность на границах блоков)
 */
function calculateBlockingArtifacts(
	data: Uint8ClampedArray,
	width: number,
	startX: number,
	startY: number,
	size: number,
): number {
	let blockingDifference = 0;
	let count = 0;

	// Проверяем правую и нижнюю границы блока
	for (let y = startY; y < startY + size; y++) {
		// Правая граница
		if (startX + size < width - 1) {
			const idxRight = (y * width + (startX + size)) * 4;
			const idxRightNext = (y * width + (startX + size + 1)) * 4;
			const lumRight =
				0.299 * data[idxRight] +
				0.587 * data[idxRight + 1] +
				0.114 * data[idxRight + 2];
			const lumRightNext =
				0.299 * data[idxRightNext] +
				0.587 * data[idxRightNext + 1] +
				0.114 * data[idxRightNext + 2];
			blockingDifference += Math.abs(lumRight - lumRightNext);
			count++;
		}
	}

	for (let x = startX; x < startX + size; x++) {
		// Нижняя граница
		if (startY + size < width - 1) {
			const idxBottom = ((startY + size) * width + x) * 4;
			const idxBottomNext = ((startY + size + 1) * width + x) * 4;
			const lumBottom =
				0.299 * data[idxBottom] +
				0.587 * data[idxBottom + 1] +
				0.114 * data[idxBottom + 2];
			const lumBottomNext =
				0.299 * data[idxBottomNext] +
				0.587 * data[idxBottomNext + 1] +
				0.114 * data[idxBottomNext + 2];
			blockingDifference += Math.abs(lumBottom - lumBottomNext);
			count++;
		}
	}

	return count > 0 ? blockingDifference / count : 0;
}

/**
 * Вычисляет итоговую оценку шума на основе всех метрик
 */
function calculateFinalNoiseScore(metrics: NoiseMetrics): number {
	// Взвешиваем метрики на основе их важности
	const highFreqWeight = 0.5; // Высокочастотный шум - самый важный
	const varianceWeight = 0.3; // Локальная дисперсия
	const blockingWeight = 0.2; // JPEG блочность

	// Нормализуем метрики к шкале 0-100 (чем больше значение - больше шума)
	const normalizedHighFreq = Math.min(100, metrics.highFreqNoise * 10);
	const normalizedVariance = Math.min(100, metrics.localVariance * 2);
	const normalizedBlocking = Math.min(100, metrics.blockingArtifacts * 15);

	// Комбинируем взвешенную сумму
	const totalNoise =
		normalizedHighFreq * highFreqWeight +
		normalizedVariance * varianceWeight +
		normalizedBlocking * blockingWeight;

	// Преобразуем в оценку качества (чем больше - меньше шума)
	return Math.max(0, 100 - totalNoise);
}

/**
 * Анализ цветопередачи через распределение цветов
 */
export function calculateColorAccuracy(imageData: ImageData): number {
	const { data } = imageData;

	// Анализируем насыщенность и баланс цветов
	let totalSaturation = 0;
	let colorBalance = 0;
	const pixelCount = data.length / 4;

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		// Насыщенность
		const saturation = max === 0 ? 0 : (max - min) / max;
		totalSaturation += saturation;

		// Баланс каналов (идеально когда близки друг к другу)
		const avgChannel = (r + g + b) / 3;
		const deviation =
			Math.abs(r - avgChannel) +
			Math.abs(g - avgChannel) +
			Math.abs(b - avgChannel);
		colorBalance += deviation;
	}

	const avgSaturation = totalSaturation / pixelCount;
	const avgDeviation = colorBalance / pixelCount;

	// Хорошая цветопередача: умеренная насыщенность и низкое отклонение
	const saturationScore = avgSaturation * 100;
	const balanceScore = Math.max(0, 100 - avgDeviation / 2);

	return saturationScore * 0.4 + balanceScore * 0.6;
}

/**
 * Анализ контраста с улучшенной нормализацией
 * Возвращает оценку 0-100 (0 = низкая контрастность, 100 = высокая контрастность)
 */
export function calculateContrast(imageData: ImageData): number {
	const { data, width, height } = imageData;

	// Преобразуем в яркость (0.299, 0.587, 0.114 - стандартные коэфф для преобразования RGB в luminance)

	const luminance: number[] = [];
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		luminance.push(0.299 * r + 0.587 * g + 0.114 * b);
	}

	// Вычисляем среднюю яркость
	const meanLuminance = luminance.reduce((a, b) => a + b, 0) / luminance.length;

	// RMS контраст
	let sumSquaredDiff = 0;
	for (const lum of luminance) {
		sumSquaredDiff += Math.pow(lum - meanLuminance, 2);
	}

	const rmsContrast = Math.sqrt(sumSquaredDiff / luminance.length);

	// Улучшенная нормализация на основе перцептивных исследований
	// RMS контраст обычно в диапазоне 0-127 для 8-битных изображений
	// Но лучше использовать адаптивную нормализацию
	return normalizeContrastScore(rmsContrast, meanLuminance);
}

/**
 * Улучшенная нормализация с учетом средней яркости
 */
function normalizeContrastScore(
	rmsContrast: number,
	meanLuminance: number,
): number {
	// Базовая нормализация: максимальный RMS контраст для 8-bit ~ 127
	let baseScore = (rmsContrast / 127) * 100;

	// Корректируем на основе средней яркости
	// Изображения со средней яркостью ~128 имеют лучшую воспринимаемую контрастность
	const brightnessFactor = 1 - Math.abs(meanLuminance - 128) / 128;

	// Комбинируем RMS контраст с коррекцией яркости
	const adjustedScore = baseScore * (0.7 + 0.3 * brightnessFactor);

	return Math.min(100, Math.max(0, adjustedScore));
}

/**
 * контраст на основе гистограммы
 */
export function calculateContrastAlternative(imageData: ImageData): number {
	const { data } = imageData;

	// Строим гистограмму яркости
	const histogram = new Array(256).fill(0);
	for (let i = 0; i < data.length; i += 4) {
		const lum = Math.round(
			0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2],
		);
		histogram[lum]++;
	}

	// Находим 5-й и 95-й процентили (игнорируем экстремумы)
	const percentiles = calculatePercentiles(histogram, data.length / 4);

	// Контраст как разность между процентилями
	const dynamicRange = percentiles.p95 - percentiles.p5;

	// Нормализуем к 0-100
	return Math.min(100, (dynamicRange / 255) * 100);
}

function calculatePercentiles(
	histogram: number[],
	totalPixels: number,
): { p5: number; p95: number } {
	let count = 0;
	let p5 = 0,
		p95 = 0;

	for (let i = 0; i < 256; i++) {
		count += histogram[i];
		if (p5 === 0 && count >= totalPixels * 0.05) p5 = i;
		if (p95 === 0 && count >= totalPixels * 0.95) p95 = i;
	}

	return { p5, p95 };
}

interface ExposureMetrics {
	medianLuminance: number;
	shadowClipping: number;
	highlightClipping: number;
	shadowDetail: number;
	highlightDetail: number;
	midtoneDetail: number;
}
/**
 * Анализ экспозиции через процентили гистограммы
 * Возвращает оценку 0-100 (0 = плохая экспозиция, 100 = отличная)
 */
export function calculateExposure(imageData: ImageData): number {
	const { data } = imageData;

	// Строим гистограмму яркости (здесь те же коэфф-ы для преобразования)
	const histogram = new Array(256).fill(0);
	for (let i = 0; i < data.length; i += 4) {
		const luminance = Math.round(
			0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2],
		);
		histogram[luminance]++;
	}

	const totalPixels = data.length / 4;

	// Анализируем ключевые показатели экспозиции
	const metrics = analyzeExposureMetrics(histogram, totalPixels);

	// Комбинируем метрики в итоговую оценку
	return calculateFinalExposureScore(metrics);
}

/**
 * Анализ ключевых метрик экспозиции
 */
function analyzeExposureMetrics(
	histogram: number[],
	totalPixels: number,
): ExposureMetrics {
	// Находим медиану (50-й процентиль) - основной показатель экспозиции
	const median = findPercentile(histogram, totalPixels, 50);

	// Анализ клиппинга в тенях и светах
	const shadowClipping =
		histogram.slice(0, 15).reduce((a, b) => a + b, 0) / totalPixels;
	const highlightClipping =
		histogram.slice(240, 256).reduce((a, b) => a + b, 0) / totalPixels;

	// Анализ распределения
	const shadowDetail =
		histogram.slice(15, 60).reduce((a, b) => a + b, 0) / totalPixels;
	const highlightDetail =
		histogram.slice(180, 240).reduce((a, b) => a + b, 0) / totalPixels;
	const midtoneDetail =
		histogram.slice(60, 180).reduce((a, b) => a + b, 0) / totalPixels;

	return {
		medianLuminance: median,
		shadowClipping,
		highlightClipping,
		shadowDetail,
		highlightDetail,
		midtoneDetail,
	};
}

/**
 * Поиск процентиля в гистограмме
 */
function findPercentile(
	histogram: number[],
	totalPixels: number,
	percentile: number,
): number {
	let count = 0;
	const target = (totalPixels * percentile) / 100;

	for (let i = 0; i < 256; i++) {
		count += histogram[i];
		if (count >= target) {
			return i;
		}
	}
	return 255;
}

/**
 * Расчет итоговой оценки экспозиции
 */
function calculateFinalExposureScore(metrics: ExposureMetrics): number {
	// 1. Оценка по медианной яркости (идеально ~128)
	const medianScore =
		100 - (Math.abs(metrics.medianLuminance - 128) / 128) * 100;

	// 2. Штраф за клиппинг (более строгий)
	const clippingPenalty =
		(metrics.shadowClipping + metrics.highlightClipping) * 200;

	// 3. Бонус за сбалансированное распределение
	const balanceScore = calculateBalanceScore(metrics);

	// Комбинируем с весами
	const finalScore =
		medianScore * 0.4 + // Медиана - самый важный показатель
		balanceScore * 0.4 + // Сбалансированность распределения
		(100 - clippingPenalty) * 0.2; // Штраф за клиппинг

	return Math.max(0, Math.min(100, finalScore));
}

/**
 * Оценка сбалансированности распределения тонов
 */
function calculateBalanceScore(metrics: ExposureMetrics): number {
	// Идеальное распределение: детали во всех диапазонах
	const shadowScore = Math.min(100, metrics.shadowDetail * 500);
	const highlightScore = Math.min(100, metrics.highlightDetail * 500);
	const midtoneScore = Math.min(100, metrics.midtoneDetail * 200);

	// Сбалансированность = минимум из всех компонентов
	return Math.min(shadowScore, highlightScore, midtoneScore);
}

// Вспомогательные типы
interface Line {
	rho: number;
	theta: number;
	votes: number;
}

interface Point {
	x: number;
	y: number;
}

/**
 * Анализ геометрических искажений через детектирование прямых линий
 * Упрощенная реализация с преобразованием Хафа
 */
export function calculateDistortion(imageData: ImageData): number {
	const { width, height } = imageData;

	// Шаг 1: Детектирование краев
	const edges = detectEdgesSimplified(imageData);

	// Шаг 2: Поиск прямых линий с помощью упрощенного преобразования Хафа
	const lines = houghTransformSimplified(edges, width, height);

	// Шаг 3: Анализ кривизны найденных линий
	const distortionScore = analyzeLinesCurvature(lines, width, height);

	return distortionScore;
}

/**
 * Упрощенное детектирование краев с помощью оператора Собеля
 */
function detectEdgesSimplified(imageData: ImageData): number[] {
	const { data, width, height } = imageData;
	const gray: number[] = [];

	// Преобразование в grayscale с понижением разрешения для производительности
	for (let y = 0; y < height; y += 2) {
		for (let x = 0; x < width; x += 2) {
			const idx = (y * width + x) * 4;
			const luminance =
				0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
			gray.push(luminance);
		}
	}

	const newWidth = Math.ceil(width / 2);
	const newHeight = Math.ceil(height / 2);
	const edges: number[] = new Array(newWidth * newHeight).fill(0);

	// Оператор Собеля для детектирования краев
	for (let y = 1; y < newHeight - 1; y++) {
		for (let x = 1; x < newWidth - 1; x++) {
			const idx = y * newWidth + x;

			// Ядра Собеля 3x3
			const gx =
				-1 * gray[(y - 1) * newWidth + (x - 1)] +
				1 * gray[(y - 1) * newWidth + (x + 1)] +
				-2 * gray[y * newWidth + (x - 1)] +
				2 * gray[y * newWidth + (x + 1)] +
				-1 * gray[(y + 1) * newWidth + (x - 1)] +
				1 * gray[(y + 1) * newWidth + (x + 1)];

			const gy =
				-1 * gray[(y - 1) * newWidth + (x - 1)] -
				2 * gray[(y - 1) * newWidth + x] -
				1 * gray[(y - 1) * newWidth + (x + 1)] +
				1 * gray[(y + 1) * newWidth + (x - 1)] +
				2 * gray[(y + 1) * newWidth + x] +
				1 * gray[(y + 1) * newWidth + (x + 1)];

			const gradient = Math.sqrt(gx * gx + gy * gy);
			edges[idx] = gradient > 50 ? gradient : 0; // Пороговая фильтрация
		}
	}

	return edges;
}

/**
 * Упрощенное преобразование Хафа для поиска прямых линий
 */
function houghTransformSimplified(
	edges: number[],
	width: number,
	height: number,
): Line[] {
	const lines: Line[] = [];

	// Упрощенный аккумулятор - только основные углы
	const thetaSteps = 36; // 10° шаг (0-180°)
	const rhoMax = Math.sqrt(width * width + height * height);
	const rhoSteps = 100;

	const accumulator: number[][] = Array(rhoSteps);
	for (let i = 0; i < rhoSteps; i++) {
		accumulator[i] = new Array(thetaSteps).fill(0);
	}

	// Заполнение аккумулятора
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (edges[y * width + x] > 0) {
				for (let thetaIndex = 0; thetaIndex < thetaSteps; thetaIndex++) {
					const theta = (thetaIndex * Math.PI) / thetaSteps;
					const rho = x * Math.cos(theta) + y * Math.sin(theta);
					const rhoIndex = Math.floor(((rho + rhoMax / 2) / rhoMax) * rhoSteps);

					if (rhoIndex >= 0 && rhoIndex < rhoSteps) {
						accumulator[rhoIndex][thetaIndex]++;
					}
				}
			}
		}
	}

	// Поиск локальных максимумов в аккумуляторе
	const threshold = 20; // Минимальное количество голосов

	for (let r = 1; r < rhoSteps - 1; r++) {
		for (let t = 1; t < thetaSteps - 1; t++) {
			const votes = accumulator[r][t];
			if (votes > threshold) {
				// Проверяем, является ли локальным максимумом
				let isMax = true;
				for (let dr = -1; dr <= 1 && isMax; dr++) {
					for (let dt = -1; dt <= 1 && isMax; dt++) {
						if (accumulator[r + dr][t + dt] > votes) {
							isMax = false;
						}
					}
				}

				if (isMax) {
					const rho = (r * rhoMax) / rhoSteps - rhoMax / 2;
					const theta = (t * Math.PI) / thetaSteps;
					lines.push({ rho, theta, votes });
				}
			}
		}
	}

	// Сортируем по количеству голосов и берем топ-10
	return lines.sort((a, b) => b.votes - a.votes).slice(0, 10);
}

/**
 * Анализ кривизны линий для оценки искажений
 */
function analyzeLinesCurvature(
	lines: Line[],
	width: number,
	height: number,
): number {
	if (lines.length < 3) {
		return 75; // Недостаточно линий для анализа - нейтральная оценка
	}

	let totalCurvature = 0;
	let analyzedLines = 0;

	// Анализируем каждую линию на предмет прямолинейности
	for (const line of lines) {
		const points = generateLinePoints(line, width, height);
		if (points.length > 2) {
			const curvature = calculateLineCurvature(points);
			totalCurvature += curvature;
			analyzedLines++;
		}
	}

	if (analyzedLines === 0) return 75;

	const avgCurvature = totalCurvature / analyzedLines;

	// Преобразуем кривизну в оценку 0-100
	// Меньше кривизны = выше оценка
	const score = Math.max(0, 100 - avgCurvature * 1000);
	return Math.min(100, score);
}

/**
 * Генерация точек вдоль линии для анализа
 */
function generateLinePoints(
	line: Line,
	width: number,
	height: number,
): Point[] {
	const points: Point[] = [];
	const { rho, theta } = line;

	// Генерируем точки вдоль линии с шагом
	for (let x = 0; x < width; x += 10) {
		if (Math.abs(Math.sin(theta)) > 0.001) {
			// Избегаем деления на ноль
			const y = (rho - x * Math.cos(theta)) / Math.sin(theta);
			if (y >= 0 && y < height) {
				points.push({ x, y });
			}
		}
	}

	for (let y = 0; y < height; y += 10) {
		if (Math.abs(Math.cos(theta)) > 0.001) {
			// Избегаем деления на ноль
			const x = (rho - y * Math.sin(theta)) / Math.cos(theta);
			if (x >= 0 && x < width) {
				// Проверяем дубликаты
				if (
					!points.some((p) => Math.abs(p.x - x) < 5 && Math.abs(p.y - y) < 5)
				) {
					points.push({ x, y });
				}
			}
		}
	}

	return points;
}

/**
 * Расчет кривизны линии через анализ отклонений
 */
function calculateLineCurvature(points: Point[]): number {
	if (points.length < 3) return 0;

	// Упрощенный расчет кривизны через анализ отклонений от идеальной прямой
	let totalDeviation = 0;

	// Сортируем точки по X (или Y для вертикальных линий)
	const sortedPoints = [...points].sort((a, b) => a.x - b.x);

	// Линейная регрессия для получения идеальной прямой
	const n = sortedPoints.length;
	let sumX = 0,
		sumY = 0,
		sumXY = 0,
		sumXX = 0;

	for (const point of sortedPoints) {
		sumX += point.x;
		sumY += point.y;
		sumXY += point.x * point.y;
		sumXX += point.x * point.x;
	}

	const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
	const intercept = (sumY - slope * sumX) / n;

	// Вычисляем среднее отклонение от идеальной прямой
	for (const point of sortedPoints) {
		const expectedY = slope * point.x + intercept;
		totalDeviation += Math.abs(point.y - expectedY);
	}

	return totalDeviation / n;
}





/**
 * Анализ хроматических аберраций через сравнение градиентов цветовых каналов
 * Возвращает оценку 0-100 (100 = нет аберраций, 0 = сильные аберрации)
 */
export function calculateChromaticAberration(imageData: ImageData): number {
    const { data, width, height } = imageData;
    
    // Анализируем только угловые области, где аберрации наиболее заметны
    const cornerRegions = [
        { x1: 0, y1: 0, x2: Math.floor(width * 0.2), y2: Math.floor(height * 0.2) }, // верхний левый
        { x1: Math.floor(width * 0.8), y1: 0, x2: width, y2: Math.floor(height * 0.2) }, // верхний правый
        { x1: 0, y1: Math.floor(height * 0.8), x2: Math.floor(width * 0.2), y2: height }, // нижний левый
        { x1: Math.floor(width * 0.8), y1: Math.floor(height * 0.8), x2: width, y2: height } // нижний правый
    ];
    
    let totalAberration = 0;
    let regionCount = 0;
    
    for (const region of cornerRegions) {
        const regionAberration = analyzeRegionAberration(data, width, height, region);
        totalAberration += regionAberration;
        regionCount++;
    }
    
    if (regionCount === 0) return 75; // нейтральная оценка если не удалось проанализировать
    
    const avgAberration = totalAberration / regionCount;
    
    // Нормализация в диапазон 0-100
    // Эмпирически: aberration < 5 = отлично, 5-15 = хорошо, 15-30 = средне, >30 = плохо
    const normalizedScore = Math.max(0, 100 - avgAberration * 3);
    return Math.min(100, normalizedScore);
}

/**
 * Анализ аберраций в конкретной области изображения
 */
function analyzeRegionAberration(
    data: Uint8ClampedArray, 
    width: number, 
    height: number, 
    region: { x1: number; y1: number; x2: number; y2: number }
): number {
    let totalAberration = 0;
    let pixelCount = 0;
    
    // Анализируем каждый 3-й пиксель для производительности
    for (let y = region.y1; y < region.y2; y += 3) {
        for (let x = region.x1; x < region.x2; x += 3) {
            // Пропускаем пиксели у границ изображения
            if (x <= 1 || x >= width - 1 || y <= 1 || y >= height - 1) continue;
            
            // Вычисляем градиенты для каждого цветового канала
            const rGradient = calculateGradientMagnitude(data, width, height, x, y, 0);
            const gGradient = calculateGradientMagnitude(data, width, height, x, y, 1);
            const bGradient = calculateGradientMagnitude(data, width, height, x, y, 2);
            
            // Хроматические аберрации = разница в силе градиентов между каналами
            const channelDiscrepancy = 
                Math.abs(rGradient - gGradient) +
                Math.abs(rGradient - bGradient) +
                Math.abs(gGradient - bGradient);
            
            totalAberration += channelDiscrepancy;
            pixelCount++;
        }
    }
    
    return pixelCount > 0 ? totalAberration / pixelCount : 0;
}

/**
 * Вычисляет величину градиента для конкретного пикселя и цветового канала
 */
function calculateGradientMagnitude(
    data: Uint8ClampedArray, 
    width: number, 
    height: number, 
    x: number, 
    y: number, 
    channelOffset: number
): number {
    // Оператор Собеля для вычисления градиента
    const gx = calculateGradientX(data, width, height, x, y, channelOffset);
    const gy = calculateGradientY(data, width, height, x, y, channelOffset);
    
    // Возвращаем величину градиента
    return Math.sqrt(gx * gx + gy * gy);
}

/**
 * Вычисляет горизонтальную компоненту градиента (Gx)
 */
function calculateGradientX(
    data: Uint8ClampedArray, 
    width: number, 
    height: number, 
    x: number, 
    y: number, 
    channelOffset: number
): number {
    // Ядро Собеля для горизонтального градиента:
    // [ -1, 0, +1 ]
    // [ -2, 0, +2 ]  
    // [ -1, 0, +1 ]
    
    const getPixel = (dx: number, dy: number): number => {
        const pixelIdx = ((y + dy) * width + (x + dx)) * 4 + channelOffset;
        return data[pixelIdx];
    };
    
    return (
        -1 * getPixel(-1, -1) + 
         1 * getPixel(1, -1) +
        -2 * getPixel(-1, 0) + 
         2 * getPixel(1, 0) +
        -1 * getPixel(-1, 1) + 
         1 * getPixel(1, 1)
    ) / 4; // Нормализация
}

/**
 * Вычисляет вертикальную компоненту градиента (Gy)
 */
function calculateGradientY(
    data: Uint8ClampedArray, 
    width: number, 
    height: number, 
    x: number, 
    y: number, 
    channelOffset: number
): number {
    // Ядро Собеля для вертикального градиента:
    // [ -1, -2, -1 ]
    // [  0,  0,  0 ]
    // [ +1, +2, +1 ]
    
    const getPixel = (dx: number, dy: number): number => {
        const pixelIdx = ((y + dy) * width + (x + dx)) * 4 + channelOffset;
        return data[pixelIdx];
    };
    
    return (
        -1 * getPixel(-1, -1) + 
        -2 * getPixel(0, -1) + 
        -1 * getPixel(1, -1) +
         1 * getPixel(-1, 1) + 
         2 * getPixel(0, 1) + 
         1 * getPixel(1, 1)
    ) / 4; // Нормализация
}

/**
 * Альтернативная упрощенная версия (менее точная, но быстрее)
 */
export function calculateChromaticAberrationSimple(imageData: ImageData): number {
    const { data, width, height } = imageData;
    
    let totalAberration = 0;
    let sampleCount = 0;
    
    // Анализируем только граничные пиксели с шагом
    const step = 5;
    
    // Верхняя и нижняя границы
    for (let x = 0; x < width; x += step) {
        for (const y of [0, height - 1]) {
            if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
                const aberration = calculatePixelAberration(data, width, height, x, y);
                totalAberration += aberration;
                sampleCount++;
            }
        }
    }
    
    // Левая и правая границы
    for (let y = 0; y < height; y += step) {
        for (const x of [0, width - 1]) {
            if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
                const aberration = calculatePixelAberration(data, width, height, x, y);
                totalAberration += aberration;
                sampleCount++;
            }
        }
    }
    
    if (sampleCount === 0) return 75;
    
    const avgAberration = totalAberration / sampleCount;
    const normalizedScore = Math.max(0, 100 - avgAberration * 2);
    return Math.min(100, normalizedScore);
}

/**
 * Вычисляет аберрацию для одного пикселя (упрощенный метод)
 */
function calculatePixelAberration(
    data: Uint8ClampedArray, 
    width: number, 
    height: number, 
    x: number, 
    y: number
): number {
    const idx = (y * width + x) * 4;
    
    // Простой анализ через разности с соседями
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Анализируем разброс значений в небольшой области
    let rVariation = 0, gVariation = 0, bVariation = 0;
    let neighborCount = 0;
    
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = (ny * width + nx) * 4;
                rVariation += Math.abs(r - data[nIdx]);
                gVariation += Math.abs(g - data[nIdx + 1]);
                bVariation += Math.abs(b - data[nIdx + 2]);
                neighborCount++;
            }
        }
    }
    
    if (neighborCount === 0) return 0;
    
    // Аберрация = разница в вариациях между каналами
    const rgDiff = Math.abs(rVariation - gVariation) / neighborCount;
    const rbDiff = Math.abs(rVariation - bVariation) / neighborCount;
    const gbDiff = Math.abs(gVariation - bVariation) / neighborCount;
    
    return (rgDiff + rbDiff + gbDiff) / 3;
}

/**
 * Комплексный анализ изображения
 */
export async function analyzeImage(file: File) {
	const imageData = await loadImageData(file);

	return {
		sharpness: calculateSharpness(imageData),
		noise: calculateNoise(imageData),
		colorAccuracy: calculateColorAccuracy(imageData),
		contrast: calculateContrast(imageData),
		exposure: calculateExposure(imageData),
		distortion: calculateDistortion(imageData),
		chromaticAberration: calculateChromaticAberration(imageData),
	};
}

/**
 * Анализ нескольких изображений и усреднение результатов
 */
export async function analyzeMultipleImages(files: File[]) {
	const results = await Promise.all(files.map((file) => analyzeImage(file)));

	// Усредняем результаты
	const averaged = {
		sharpness: 0,
		noise: 0,
		colorAccuracy: 0,
		contrast: 0,
		exposure: 0,
		distortion: 0,
		chromaticAberration: 0,
	};

	for (const result of results) {
		averaged.sharpness += result.sharpness;
		averaged.noise += result.noise;
		averaged.colorAccuracy += result.colorAccuracy;
		averaged.contrast += result.contrast;
		averaged.exposure += result.exposure;
		averaged.distortion += result.distortion;
		averaged.chromaticAberration += result.chromaticAberration;
	}

	const count = results.length;

	return {
		sharpness: averaged.sharpness / count,
		noise: averaged.noise / count,
		colorAccuracy: averaged.colorAccuracy / count,
		contrast: averaged.contrast / count,
		exposure: averaged.exposure / count,
		distortion: averaged.distortion / count,
		chromaticAberration: averaged.chromaticAberration / count,
	};
}
