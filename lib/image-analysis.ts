// Утилиты для реального анализа качества изображений

interface ImageData {
  data: Uint8ClampedArray
  width: number
  height: number
}

/**
 * Загружает изображение и возвращает ImageData
 */
export async function loadImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Не удалось получить контекст canvas"))
        return
      }

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      resolve({
        data: imageData.data,
        width: canvas.width,
        height: canvas.height,
      })
    }

    img.onerror = () => reject(new Error("Ошибка загрузки изображения"))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Анализ резкости изображения с использованием Laplacian variance
 * Высокая дисперсия = высокая резкость
 */
export function calculateSharpness(imageData: ImageData): number {
  const { data, width, height } = imageData

  // Преобразуем в grayscale
  const gray: number[] = []
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    gray.push(0.299 * r + 0.587 * g + 0.114 * b)
  }

  // Применяем оператор Лапласа
  let laplacianSum = 0
  let count = 0

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x

      // Ядро Лапласа 3x3
      const laplacian =
        -1 * gray[idx - width - 1] +
        -1 * gray[idx - width] +
        -1 * gray[idx - width + 1] +
        -1 * gray[idx - 1] +
        8 * gray[idx] +
        -1 * gray[idx + 1] +
        -1 * gray[idx + width - 1] +
        -1 * gray[idx + width] +
        -1 * gray[idx + width + 1]

      laplacianSum += laplacian * laplacian
      count++
    }
  }

  // Вычисляем дисперсию
  const variance = laplacianSum / count

  // Нормализуем к шкале 0-100
  // Типичные значения variance: 0-10000
  const normalized = Math.min(100, variance / 100)

  return normalized
}

/**
 * Анализ уровня шума через стандартное отклонение
 * Низкий шум = высокий балл
 */
export function calculateNoise(imageData: ImageData): number {
  const { data } = imageData

  // Вычисляем стандартное отклонение для каждого канала
  let sumR = 0,
    sumG = 0,
    sumB = 0
  let sumSqR = 0,
    sumSqG = 0,
    sumSqB = 0
  const pixelCount = data.length / 4

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    sumR += r
    sumG += g
    sumB += b

    sumSqR += r * r
    sumSqG += g * g
    sumSqB += b * b
  }

  const meanR = sumR / pixelCount
  const meanG = sumG / pixelCount
  const meanB = sumB / pixelCount

  const varianceR = sumSqR / pixelCount - meanR * meanR // дисперсия
  const varianceG = sumSqG / pixelCount - meanG * meanG
  const varianceB = sumSqB / pixelCount - meanB * meanB

  const stdDev = Math.sqrt((varianceR + varianceG + varianceB) / 3)

  // Нормализуем: меньше шума = выше балл
  // Типичное stdDev: 10-60
  const noiseScore = Math.max(0, 100 - stdDev / 0.9)
  console.log(varianceR, varianceG, varianceB, stdDev, noiseScore)

  return Math.min(100, noiseScore)
}

/**
 * Анализ цветопередачи через распределение цветов
 */
export function calculateColorAccuracy(imageData: ImageData): number {
  const { data } = imageData

  // Анализируем насыщенность и баланс цветов
  let totalSaturation = 0
  let colorBalance = 0
  const pixelCount = data.length / 4

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    // Насыщенность
    const saturation = max === 0 ? 0 : (max - min) / max
    totalSaturation += saturation

    // Баланс каналов (идеально когда близки друг к другу)
    const avgChannel = (r + g + b) / 3
    const deviation = Math.abs(r - avgChannel) + Math.abs(g - avgChannel) + Math.abs(b - avgChannel)
    colorBalance += deviation
  }

  const avgSaturation = totalSaturation / pixelCount
  const avgDeviation = colorBalance / pixelCount

  // Хорошая цветопередача: умеренная насыщенность и низкое отклонение
  const saturationScore = avgSaturation * 100
  const balanceScore = Math.max(0, 100 - avgDeviation / 2)

  return saturationScore * 0.4 + balanceScore * 0.6
}

/**
 * Анализ контраста (RMS контраст)
 */
export function calculateContrast(imageData: ImageData): number {
  const { data } = imageData

  // Преобразуем в яркость
  const luminance: number[] = []
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    luminance.push(0.299 * r + 0.587 * g + 0.114 * b)
  }

  // Вычисляем среднюю яркость
  const meanLuminance = luminance.reduce((a, b) => a + b, 0) / luminance.length

  // RMS контраст
  let sumSquaredDiff = 0
  for (const lum of luminance) {
    sumSquaredDiff += Math.pow(lum - meanLuminance, 2)
  }

  const rmsContrast = Math.sqrt(sumSquaredDiff / luminance.length)

  // Нормализуем к шкале 0-100
  // Типичный RMS контраст: 20-80
  const normalized = Math.min(100, rmsContrast / 0.8)

  return normalized
}

/**
 * Анализ экспозиции через гистограмму яркости
 */
export function calculateExposure(imageData: ImageData): number {
  const { data } = imageData

  // Создаем гистограмму яркости
  const histogram = new Array(256).fill(0)

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const luminance = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
    histogram[luminance]++
  }

  const totalPixels = data.length / 4

  // Проверяем пересветы (clipping) и недосветы (crushing)
  const shadows = histogram.slice(0, 25).reduce((a, b) => a + b, 0) / totalPixels
  const highlights = histogram.slice(230, 256).reduce((a, b) => a + b, 0) / totalPixels

  // Проверяем распределение в средних тонах
  const midtones = histogram.slice(85, 170).reduce((a, b) => a + b, 0) / totalPixels

  // Идеальная экспозиция: мало пересветов/недосветов, много средних тонов
  const clippingPenalty = (shadows + highlights) * 100
  const midtoneBonus = midtones * 100

  const exposureScore = Math.max(0, 100 - clippingPenalty + midtoneBonus * 0.5)

  return Math.min(100, exposureScore)
}

/**
 * Анализ геометрических искажений
 * Упрощенный метод: анализ симметрии
 */
export function calculateDistortion(imageData: ImageData): number {
  const { data, width, height } = imageData

  // Сравниваем левую и правую половины
  let symmetryScore = 0
  const halfWidth = Math.floor(width / 2)

  for (let y = 0; y < height; y += 10) {
    for (let x = 0; x < halfWidth; x += 10) {
      const leftIdx = (y * width + x) * 4
      const rightIdx = (y * width + (width - x - 1)) * 4

      const leftR = data[leftIdx]
      const leftG = data[leftIdx + 1]
      const leftB = data[leftIdx + 2]

      const rightR = data[rightIdx]
      const rightG = data[rightIdx + 1]
      const rightB = data[rightIdx + 2]

      const diff = Math.abs(leftR - rightR) + Math.abs(leftG - rightG) + Math.abs(leftB - rightB)
      symmetryScore += diff
    }
  }

  const samplesCount = (height / 10) * (halfWidth / 10)
  const avgDiff = symmetryScore / samplesCount

  // Меньше различий = меньше искажений
  const distortionScore = Math.max(0, 100 - avgDiff / 5)

  return Math.min(100, distortionScore)
}

/**
 * Анализ виньетирования (затемнение по краям)
 */
export function calculateVignetting(imageData: ImageData): number {
  const { data, width, height } = imageData

  // Вычисляем среднюю яркость в центре
  const centerX = Math.floor(width / 2)
  const centerY = Math.floor(height / 2)
  const centerRadius = Math.min(width, height) / 6

  let centerBrightness = 0
  let centerCount = 0

  for (let y = centerY - centerRadius; y < centerY + centerRadius; y++) {
    for (let x = centerX - centerRadius; x < centerX + centerRadius; x++) {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const idx = (y * width + x) * 4
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
        centerBrightness += brightness
        centerCount++
      }
    }
  }

  centerBrightness /= centerCount

  // Вычисляем среднюю яркость по углам
  const cornerSize = Math.min(width, height) / 10
  let cornerBrightness = 0
  let cornerCount = 0

  const corners = [
    { x: 0, y: 0 },
    { x: width - cornerSize, y: 0 },
    { x: 0, y: height - cornerSize },
    { x: width - cornerSize, y: height - cornerSize },
  ]

  for (const corner of corners) {
    for (let y = corner.y; y < corner.y + cornerSize && y < height; y++) {
      for (let x = corner.x; x < corner.x + cornerSize && x < width; x++) {
        const idx = (y * width + x) * 4
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
        cornerBrightness += brightness
        cornerCount++
      }
    }
  }

  cornerBrightness /= cornerCount

  // Вычисляем разницу между центром и углами
  const vignettingAmount = centerBrightness - cornerBrightness

  // Меньше разница = меньше виньетирования
  const vignettingScore = Math.max(0, 100 - vignettingAmount / 2)

  return Math.min(100, vignettingScore)
}

/**
 * Анализ хроматических аберраций
 * Проверяем различия между цветовыми каналами на краях
 */
export function calculateChromaticAberration(imageData: ImageData): number {
  const { data, width, height } = imageData

  // Анализируем края изображения
  let aberrationSum = 0
  let edgeCount = 0

  // Проверяем верхний и нижний края
  for (let x = 0; x < width; x += 5) {
    for (const y of [0, height - 1]) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]

      // Вычисляем различия между каналами
      const rg = Math.abs(r - g)
      const rb = Math.abs(r - b)
      const gb = Math.abs(g - b)

      aberrationSum += (rg + rb + gb) / 3
      edgeCount++
    }
  }

  // Проверяем левый и правый края
  for (let y = 0; y < height; y += 5) {
    for (const x of [0, width - 1]) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]

      const rg = Math.abs(r - g)
      const rb = Math.abs(r - b)
      const gb = Math.abs(g - b)

      aberrationSum += (rg + rb + gb) / 3
      edgeCount++
    }
  }

  const avgAberration = aberrationSum / edgeCount

  // Меньше различий = меньше аберраций
  const aberrationScore = Math.max(0, 100 - avgAberration / 2)

  return Math.min(100, aberrationScore)
}

/**
 * Комплексный анализ изображения
 */
export async function analyzeImage(file: File) {
  const imageData = await loadImageData(file)

  return {
    sharpness: calculateSharpness(imageData),
    noise: calculateNoise(imageData),
    colorAccuracy: calculateColorAccuracy(imageData),
    contrast: calculateContrast(imageData),
    exposure: calculateExposure(imageData),
    distortion: calculateDistortion(imageData),
    /* vignetting: calculateVignetting(imageData), */
    chromaticAberration: calculateChromaticAberration(imageData),
  }
}

/**
 * Анализ нескольких изображений и усреднение результатов
 */
export async function analyzeMultipleImages(files: File[]) {
  const results = await Promise.all(files.map((file) => analyzeImage(file)))

  // Усредняем результаты
  const averaged = {
    sharpness: 0,
    noise: 0,
    colorAccuracy: 0,
    contrast: 0,
    exposure: 0,
    distortion: 0,/* 
    vignetting: 0, */
    chromaticAberration: 0,
  }

  for (const result of results) {
    averaged.sharpness += result.sharpness
    averaged.noise += result.noise
    averaged.colorAccuracy += result.colorAccuracy
    averaged.contrast += result.contrast
    averaged.exposure += result.exposure
    averaged.distortion += result.distortion
    /* averaged.vignetting += result.vignetting */
    averaged.chromaticAberration += result.chromaticAberration
  }

  const count = results.length

  return {
    sharpness: averaged.sharpness / count,
    noise: averaged.noise / count,
    colorAccuracy: averaged.colorAccuracy / count,
    contrast: averaged.contrast / count,
    exposure: averaged.exposure / count,
    distortion: averaged.distortion / count,
    /* vignetting: averaged.vignetting / count, */
    chromaticAberration: averaged.chromaticAberration / count,
  }
}
