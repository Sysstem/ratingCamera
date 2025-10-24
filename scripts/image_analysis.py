"""
Скрипт для анализа качества изображений камер телефонов
Демонстрационная версия основных алгоритмов анализа
"""

import numpy as np
from PIL import Image
import json
import sys
from typing import Dict, Any

def calculate_sharpness(image_array: np.ndarray) -> float:
    """
    Расчет резкости изображения с использованием Laplacian variance
    """
    # Преобразование в градации серого
    if len(image_array.shape) == 3:
        gray = np.dot(image_array[...,:3], [0.2989, 0.5870, 0.1140])
    else:
        gray = image_array
    
    # Применение оператора Лапласа
    laplacian = np.array([[0, -1, 0], [-1, 4, -1], [0, -1, 0]])
    
    # Свертка с ядром Лапласа
    height, width = gray.shape
    result = np.zeros_like(gray)
    
    for i in range(1, height-1):
        for j in range(1, width-1):
            result[i, j] = np.sum(gray[i-1:i+2, j-1:j+2] * laplacian)
    
    # Расчет дисперсии
    variance = np.var(result)
    
    # Нормализация к шкале 0-100
    sharpness_score = min(100, variance / 1000 * 100)
    
    return float(sharpness_score)

def calculate_noise_level(image_array: np.ndarray) -> float:
    """
    Оценка уровня шума в изображении
    """
    # Преобразование в градации серого
    if len(image_array.shape) == 3:
        gray = np.dot(image_array[...,:3], [0.2989, 0.5870, 0.1140])
    else:
        gray = image_array
    
    # Применение медианного фильтра (упрощенная версия)
    height, width = gray.shape
    filtered = np.zeros_like(gray)
    
    for i in range(1, height-1):
        for j in range(1, width-1):
            window = gray[i-1:i+2, j-1:j+2].flatten()
            filtered[i, j] = np.median(window)
    
    # Разность между оригиналом и отфильтрованным изображением
    noise = np.abs(gray - filtered)
    noise_level = np.mean(noise)
    
    # Инвертированная нормализация (меньше шума = выше балл)
    noise_score = max(0, 100 - (noise_level / 10 * 100))
    
    return float(noise_score)

def calculate_contrast(image_array: np.ndarray) -> float:
    """
    Расчет контраста изображения (RMS контраст)
    """
    # Преобразование в градации серого
    if len(image_array.shape) == 3:
        gray = np.dot(image_array[...,:3], [0.2989, 0.5870, 0.1140])
    else:
        gray = image_array
    
    # Нормализация к диапазону 0-1
    gray_norm = gray / 255.0
    
    # Расчет среднего значения
    mean_intensity = np.mean(gray_norm)
    
    # RMS контраст
    rms_contrast = np.sqrt(np.mean((gray_norm - mean_intensity) ** 2))
    
    # Нормализация к шкале 0-100
    contrast_score = min(100, rms_contrast * 400)
    
    return float(contrast_score)

def calculate_color_accuracy(image_array: np.ndarray) -> float:
    """
    Упрощенная оценка цветопередачи
    """
    if len(image_array.shape) != 3:
        return 50.0  # Нейтральная оценка для ч/б изображений
    
    # Анализ цветовых каналов
    r_channel = image_array[:, :, 0]
    g_channel = image_array[:, :, 1] 
    b_channel = image_array[:, :, 2]
    
    # Расчет баланса каналов
    r_mean = np.mean(r_channel)
    g_mean = np.mean(g_channel)
    b_mean = np.mean(b_channel)
    
    # Оценка баланса белого (идеальный баланс = равные средние значения)
    total_mean = (r_mean + g_mean + b_mean) / 3
    
    r_deviation = abs(r_mean - total_mean) / total_mean
    g_deviation = abs(g_mean - total_mean) / total_mean
    b_deviation = abs(b_mean - total_mean) / total_mean
    
    average_deviation = (r_deviation + g_deviation + b_deviation) / 3
    
    # Инвертированная нормализация
    color_score = max(0, 100 - (average_deviation * 200))
    
    return float(color_score)

def analyze_image(image_path: str) -> Dict[str, Any]:
    """
    Комплексный анализ изображения
    """
    try:
        # Загрузка изображения
        image = Image.open(image_path)
        image_array = np.array(image)
        
        # Анализ по всем метрикам
        sharpness = calculate_sharpness(image_array)
        noise = calculate_noise_level(image_array)
        contrast = calculate_contrast(image_array)
        color_accuracy = calculate_color_accuracy(image_array)
        
        # Генерация дополнительных метрик (упрощенные версии)
        exposure = min(100, max(0, 100 - abs(np.mean(image_array) - 128) / 128 * 100))
        distortion = np.random.uniform(80, 95)  # Демо значение
        vignetting = np.random.uniform(75, 90)  # Демо значение
        chromatic_aberration = np.random.uniform(70, 85)  # Демо значение
        
        # Расчет общего балла
        weights = {
            'sharpness': 0.20,
            'noise': 0.15,
            'color_accuracy': 0.15,
            'contrast': 0.15,
            'exposure': 0.10,
            'distortion': 0.10,
            'vignetting': 0.10,
            'chromatic_aberration': 0.05
        }
        
        overall_score = (
            sharpness * weights['sharpness'] +
            noise * weights['noise'] +
            color_accuracy * weights['color_accuracy'] +
            contrast * weights['contrast'] +
            exposure * weights['exposure'] +
            distortion * weights['distortion'] +
            vignetting * weights['vignetting'] +
            chromatic_aberration * weights['chromatic_aberration']
        )
        
        results = {
            'sharpness': round(sharpness, 1),
            'noise': round(noise, 1),
            'colorAccuracy': round(color_accuracy, 1),
            'contrast': round(contrast, 1),
            'exposure': round(exposure, 1),
            'distortion': round(distortion, 1),
            'vignetting': round(vignetting, 1),
            'chromaticAberration': round(chromatic_aberration, 1),
            'overallScore': round(overall_score, 1),
            'imageInfo': {
                'width': image.width,
                'height': image.height,
                'format': image.format,
                'mode': image.mode
            }
        }
        
        return results
        
    except Exception as e:
        return {
            'error': f'Ошибка анализа изображения: {str(e)}',
            'sharpness': 0,
            'noise': 0,
            'colorAccuracy': 0,
            'contrast': 0,
            'exposure': 0,
            'distortion': 0,
            'vignetting': 0,
            'chromaticAberration': 0,
            'overallScore': 0
        }

def main():
    """
    Основная функция для запуска анализа
    """
    if len(sys.argv) != 2:
        print("Использование: python image_analysis.py <путь_к_изображению>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    results = analyze_image(image_path)
    
    # Вывод результатов в формате JSON
    print(json.dumps(results, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
