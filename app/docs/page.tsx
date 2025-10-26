import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ExternalLink, BookOpen, Calculator, Target, Zap } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Документация</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/">Главная</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/analyze">Анализ</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">Документация системы</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Подробное описание метрик, методологии и научного обоснования системы оценки
          </p>
        </div>

        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metrics">Метрики</TabsTrigger>
            <TabsTrigger value="methodology">Методология</TabsTrigger>
            <TabsTrigger value="references">Источники</TabsTrigger>
            <TabsTrigger value="installation">Установка</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid gap-6">
                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Резкость (Sharpness)
                            </CardTitle>
                            <Badge variant="secondary">Вес: 25%</Badge>
                        </div>
                        <CardDescription>Оценка четкости деталей и границ объектов на изображении</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Используемые алгоритмы:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Laplacian Variance</strong> - дисперсия лапласиана для оценки резкости
                                    </li>
                                    <li>
                                        <strong>Оператор Лапласа 3x3</strong> - выделение высокочастотных компонентов
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    Sharpness = min(100, 100 × log₁ₐ(variance) / 10)<br />
                                    где variance = Σ(laplacian²) / count
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Шум (Noise Level)
                            </CardTitle>
                            <Badge variant="secondary">Вес: 20%</Badge>
                        </div>
                        <CardDescription>Измерение уровня цифрового шума и JPEG артефактов в изображении</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Используемые метрики:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Анализ в однородных областях</strong> - поиск блоков 4×4 с низкой дисперсией
                                    </li>
                                    <li>
                                        <strong>Высокочастотный шум</strong> - разность соседних пикселей
                                    </li>
                                    <li>
                                        <strong>JPEG блочность</strong> - анализ границ блоков сжатия
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    Noise_Score = 100 - (0.5×HighFreqNoise + 0.3×LocalVariance + 0.2×BlockingArtifacts)<br />
                                    HighFreqNoise = Σ|center - neighbor| / count
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Цветопередача (Color Accuracy)</CardTitle>
                            <Badge variant="secondary">Вес: 15%</Badge>
                        </div>
                        <CardDescription>Баланс цветовых каналов и насыщенность изображения</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Используемые методы:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Насыщенность цвета</strong> - анализ цветовой насыщенности (S = (max - min) / max)
                                    </li>
                                    <li>
                                        <strong>Баланс каналов</strong> - отклонение каналов RGB от среднего значения
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    Color_Score = 0.4 × Saturation_Score + 0.6 × Balance_Score<br />
                                    Balance_Score = max(0, 100 - avg_deviation / 2)
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Контраст (Contrast)</CardTitle>
                            <Badge variant="secondary">Вес: 15%</Badge>
                        </div>
                        <CardDescription>Динамический диапазон и контрастность изображения с учетом яркости</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Анализируемые параметры:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>RMS Contrast</strong> - среднеквадратичный контраст
                                    </li>
                                    <li>
                                        <strong>Динамический диапазон</strong> - разность 5-го и 95-го процентилей
                                    </li>
                                    <li>
                                        <strong>Коррекция яркости</strong> - учет средней яркости для восприятия
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    RMS_Contrast = √(Σ(lum - mean_lum)² / N)<br />
                                    Contrast_Score = (RMS_Contrast / 127) × 100 × (0.7 + 0.3 × brightness_factor)
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Экспозиция (Exposure)</CardTitle>
                            <Badge variant="secondary">Вес: 10%</Badge>
                        </div>
                        <CardDescription>Анализ распределения яркости и клиппинга в тенях/светах</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Используемые методы:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Медианная яркость</strong> - 50-й процентиль гистограммы (идеал ~128)
                                    </li>
                                    <li>
                                        <strong>Анализ клиппинга</strong> - пересветы (240-255) и недосветы (0-15)
                                    </li>
                                    <li>
                                        <strong>Распределение тонов</strong> - детали в тенях, средних тонах и светах
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    Exposure_Score = 0.4×Median_Score + 0.4×Balance_Score + 0.2×(100-Clipping_Penalty)<br />
                                    Median_Score = 100 - |median - 128| / 128 × 100
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Геометрические искажения (Distortion)</CardTitle>
                            <Badge variant="secondary">Вес: 10%</Badge>
                        </div>
                        <CardDescription>Анализ прямолинейности линий через преобразование Хафа</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Используемые методы:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Преобразование Хафа</strong> - детектирование прямых линий
                                    </li>
                                    <li>
                                        <strong>Оператор Собеля</strong> - выделение краев с пониженным разрешением
                                    </li>
                                    <li>
                                        <strong>Анализ кривизны</strong> - отклонение точек линии от идеальной прямой
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    Curvature = Σ|y_actual - (slope×x + intercept)| / N<br />
                                    Distortion_Score = max(0, 100 - avg_curvature × 1000)
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Хроматические аберрации</CardTitle>
                            <Badge variant="secondary">Вес: 5%</Badge>
                        </div>
                        <CardDescription>Анализ смещения цветовых каналов через градиенты в угловых областях</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Используемые методы:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Анализ градиентов</strong> - оператор Собеля для каждого цветового канала
                                    </li>
                                    <li>
                                        <strong>Сравнение каналов</strong> - разница градиентов R, G, B в угловых областях
                                    </li>
                                    <li>
                                        <strong>Фокус на краях</strong> - анализ 20% областей по углам изображения
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Формула расчета:</h4>
                                <code className="bg-muted p-2 rounded text-sm block">
                                    Aberration = Σ(|∇R - ∇G| + |∇R - ∇B| + |∇G - ∇B|) / count<br />
                                    CA_Score = max(0, 100 - avg_aberration × 3)
                                </code>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Методология расчета итоговой оценки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Формула итогового балла</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <code className="text-sm">
                        Overall_Score = Σ(Metric_i × Weight_i)
                        <br />
                        <br />
                        где:
                        <br />• Metric_i - нормализованное значение метрики (0-100)
                        <br />• Weight_i - весовой коэффициент метрики
                        <br />• Σ Weight_i = 1.0
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Нормализация метрик</h3>
                    <p className="text-muted-foreground mb-3">Все метрики приводятся к единой шкале 0-100 баллов:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>100 баллов - идеальное качество по данной метрике</li>
                      <li>90-99 баллов - отличное качество</li>
                      <li>80-89 баллов - хорошее качество</li>
                      <li>70-79 баллов - удовлетворительное качество</li>
                      <li>Менее 70 баллов - требует улучшения</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Условия фотографирования</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Освещение</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Дневной свет (5500K)</li>
                          <li>• Освещенность: 1000-2000 лк</li>
                          <li>• Без прямых солнечных лучей</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Настройки камеры</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Автоматический режим</li>
                          <li>• Стабилизация включена</li>
                          <li>• Максимальное разрешение</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Объекты съемки</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Тестовые мишени</li>
                          <li>• Портреты</li>
                          <li>• Пейзажи</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Технические требования</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Расстояние: 1-3 метра</li>
                          <li>• Штатив для стабильности</li>
                          <li>• Формат: JPEG высокого качества</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="references" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Научные источники и литература
                </CardTitle>
                <CardDescription>Ссылки на научные статьи и стандарты, используемые в системе</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="max-w-4xl mx-auto space-y-4 p-4">
                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Оператор Лапласа для оценки резкости</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateSharpness</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Laplace Variance Method for Image Sharpness Assessment</p>
                        <p className="mb-2"><strong>Источник:</strong> Pech-Pacheco, J. L., et al. "Diatom autofocusing in brightfield microscopy: a comparative study." Proceedings 15th International Conference on Pattern Recognition (2000)</p>
                        <a href="https://doi.org/10.1109/ICPR.2000.903548" className="text-blue-600 hover:text-blue-800 underline">https://doi.org/10.1109/ICPR.2000.903548</a>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Преобразование Хафа для детектирования линий</h3>
                        <p className="mb-2"><strong>Функция:</strong> houghTransformSimplified</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Hough Transform for Line Detection</p>
                        <p className="mb-2"><strong>Источник:</strong> Duda, R. O., & Hart, P. E. "Use of the Hough transformation to detect lines and curves in pictures." Communications of the ACM (1972)</p>
                        <a href="https://doi.org/10.1145/361237.361242" className="text-blue-600 hover:text-blue-800 underline">https://doi.org/10.1145/361237.361242</a>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Оператор Собеля для детектирования краев</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculatePixelGradient, detectEdgesSimplified</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Sobel Operator for Edge Detection</p>
                        <p className="mb-2"><strong>Источник:</strong> Sobel, I., & Feldman, G. "A 3x3 isotropic gradient operator for image processing." Pattern ClassNameification and Scene Analysis (1973)</p>
                        <p className="text-gray-600">Стандартный алгоритм компьютерного зрения</p>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Анализ шума в однородных областях</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateNoise, findHomogeneousBlocks</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Homogeneous Region Analysis for Noise Estimation</p>
                        <p className="mb-2"><strong>Источник:</strong> Liu, C., et al. "Noise estimation from a single image." IEEE Conference on Computer Vision and Pattern Recognition (2006)</p>
                        <a href="https://doi.org/10.1109/CVPR.2006.90" className="text-blue-600 hover:text-blue-800 underline">https://doi.org/10.1109/CVPR.2006.90</a>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">RMS контраст</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateContrast</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Root Mean Square Contrast</p>
                        <p className="mb-2"><strong>Источник:</strong> Peli, E. "Contrast in complex images." Journal of the Optical Society of America A (1990)</p>
                        <a href="https://doi.org/10.1364/JOSAA.7.000203" className="text-blue-600 hover:text-blue-800 underline">https://doi.org/10.1364/JOSAA.7.000203</a>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Анализ гистограммы для экспозиции</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateExposure, findPercentile</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Histogram Percentile Analysis for Exposure Assessment</p>
                        <p className="mb-2"><strong>Источник:</strong> Standard photography techniques - анализ гистограммы яркости</p>
                        <p className="text-gray-600">Стандартный метод в цифровой фотографии</p>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Анализ хроматических аберраций через градиенты</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateChromaticAberrationImproved</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Chromatic Aberration Detection via Channel Gradient Discrepancy</p>
                        <p className="mb-2"><strong>Источник:</strong> Kang, S. B. "Automatic removal of chromatic aberration from a single image." IEEE Conference on Computer Vision and Pattern Recognition (2007)</p>
                        <a href="https://doi.org/10.1109/CVPR.2007.383011" className="text-blue-600 hover:text-blue-800 underline">https://doi.org/10.1109/CVPR.2007.383011</a>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Анализ цветопередачи через насыщенность и баланс</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateColorAccuracy</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Color Saturation and Channel Balance Analysis</p>
                        <p className="mb-2"><strong>Источник:</strong> Стандартные метрики цветового анализа в обработке изображений</p>
                        <p className="text-gray-600">Основы цветовых пространств и анализа</p>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">JPEG блочность артефактов</h3>
                        <p className="mb-2"><strong>Функция:</strong> calculateBlockingArtifacts</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> Blocking Artifact Detection in JPEG Images</p>
                        <p className="mb-2"><strong>Источник:</strong> Wang, Z., et al. "Blind measurement of blocking artifacts in images." IEEE International Conference on Image Processing (2000)</p>
                        <a href="https://doi.org/10.1109/ICIP.2000.899476" className="text-blue-600 hover:text-blue-800 underline">https://doi.org/10.1109/ICIP.2000.899476</a>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-transparent">
                        <h3 className="text-lg font-semibold mb-2">Преобразование RGB в яркость</h3>
                        <p className="mb-2"><strong>Функция:</strong> Используется в большинстве функций</p>
                        <p className="mb-2"><strong>Алгоритм:</strong> RGB to Luminance Conversion (Rec. 601)</p>
                        <p className="mb-2"><strong>Источник:</strong> ITU-R Recommendation BT.601 "Studio encoding parameters of digital television"</p>
                        <a href="https://www.itu.int/rec/R-REC-BT.601" className="text-blue-600 hover:text-blue-800 underline">https://www.itu.int/rec/R-REC-BT.601</a>
                    </div>
                </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Установка и запуск системы</CardTitle>
                <CardDescription>Пошаговая инструкция по установке и настройке системы оценки камер</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Системные требования</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Минимальные требования</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Node.js 18.0 или выше</li>
                          <li>• npm 8.0 или выше</li>
                          <li>• 4 ГБ оперативной памяти</li>
                          <li>• 2 ГБ свободного места</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Рекомендуемые требования</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Node.js 20.0 или выше</li>
                          <li>• npm 10.0 или выше</li>
                          <li>• 8 ГБ оперативной памяти</li>
                          <li>• 5 ГБ свободного места</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Установка</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">1. Клонирование репозитория</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm">
                            git clone https://github.com/your-team/camera-rating-system.git
                            <br />
                            cd camera-rating-system
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">2. Установка зависимостей</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm">npm install</code>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">3. Настройка окружения</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm">
                            cp .env.example .env.local
                            <br /># Отредактируйте .env.local согласно вашим настройкам
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">4. Запуск в режиме разработки</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm">npm run dev</code>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Приложение будет доступно по адресу http://localhost:3000
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">5. Сборка для продакшена</h4>
                        <div className="bg-muted p-3 rounded-lg">
                          <code className="text-sm">
                            npm run build
                            <br />
                            npm start
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Структура проекта</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <code className="text-sm whitespace-pre">
                        {`camera-rating-system/
├── app/                    # Next.js App Router
│   ├── analyze/           # Страница анализа изображений
│   ├── rating/            # Страница рейтинга камер
│   ├── docs/              # Документация
│   └── team/              # Информация о команде
├── components/            # React компоненты
│   └── ui/                # UI компоненты
├── lib/                   # Утилиты и библиотеки
├── public/                # Статические файлы
├── scripts/               # Скрипты анализа изображений
└── README.md              # Документация проекта`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Использование</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Откройте приложение в браузере</li>
                      <li>Перейдите на страницу "Анализ"</li>
                      <li>Загрузите изображения с камеры телефона</li>
                      <li>Нажмите "Начать анализ" и дождитесь результатов</li>
                      <li>Просмотрите детальные метрики качества</li>
                      <li>Сравните результаты в разделе "Рейтинг"</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
