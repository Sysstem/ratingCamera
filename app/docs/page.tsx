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
              {/* Sharpness */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Резкость (Sharpness)
                    </CardTitle>
                    <Badge variant="secondary">Вес: 20%</Badge>
                  </div>
                  <CardDescription>Оценка четкости деталей и границ объектов на изображении</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Используемые алгоритмы:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          <strong>SSIM (Structural Similarity Index)</strong> - сравнение структурного сходства
                        </li>
                        <li>
                          <strong>Laplacian Variance</strong> - анализ градиентов изображения
                        </li>
                        <li>
                          <strong>Sobel Edge Detection</strong> - выделение границ объектов
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Формула расчета:</h4>
                      <code className="bg-muted p-2 rounded text-sm block">
                        Sharpness = 0.4 × SSIM + 0.4 × Laplacian_Var + 0.2 × Sobel_Score
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Noise */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Шум (Noise Level)
                    </CardTitle>
                    <Badge variant="secondary">Вес: 15%</Badge>
                  </div>
                  <CardDescription>Измерение уровня цифрового шума в изображении</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Используемые метрики:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          <strong>PSNR (Peak Signal-to-Noise Ratio)</strong> - отношение сигнал/шум
                        </li>
                        <li>
                          <strong>SNR (Signal-to-Noise Ratio)</strong> - общий уровень шума
                        </li>
                        <li>
                          <strong>Wavelet Denoising Analysis</strong> - анализ шума в частотной области
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Формула расчета:</h4>
                      <code className="bg-muted p-2 rounded text-sm block">
                        Noise_Score = 100 - (Noise_Level × 100 / Max_Noise)
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Accuracy */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Цветопередача (Color Accuracy)</CardTitle>
                    <Badge variant="secondary">Вес: 15%</Badge>
                  </div>
                  <CardDescription>Точность воспроизведения цветов относительно эталонных значений</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Используемые методы:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          <strong>Delta E (CIE76, CIE94, CIE2000)</strong> - различие в цветовом пространстве
                        </li>
                        <li>
                          <strong>Color Gamut Analysis</strong> - анализ цветового охвата
                        </li>
                        <li>
                          <strong>White Balance Accuracy</strong> - точность баланса белого
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Эталонные цвета:</h4>
                      <p className="text-sm text-muted-foreground">
                        Используется цветовая мишень ColorChecker Classic с 24 эталонными цветами
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contrast */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Контраст (Contrast)</CardTitle>
                    <Badge variant="secondary">Вес: 15%</Badge>
                  </div>
                  <CardDescription>Динамический диапазон и контрастность изображения</CardDescription>
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
                          <strong>Michelson Contrast</strong> - контраст по Майкельсону
                        </li>
                        <li>
                          <strong>Dynamic Range</strong> - динамический диапазон
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Экспозиция</CardTitle>
                    <Badge variant="secondary">Вес: 10%</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Анализ гистограммы, зональная система Анселя Адамса, оценка пересветов и недосветов
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Искажения</CardTitle>
                    <Badge variant="secondary">Вес: 10%</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Бочкообразные и подушкообразные искажения, анализ геометрической точности
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Хроматические аберрации</CardTitle>
                    <Badge variant="secondary">Вес: 5%</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Цветовые искажения на границах объектов, продольные и поперечные аберрации
                    </p>
                  </CardContent>
                </Card>
              </div>
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Основные источники</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium">
                          Image Quality Assessment: From Error Visibility to Structural Similarity
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Wang, Z., Bovik, A. C., Sheikh, H. R., & Simoncelli, E. P. (2004)
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a href="https://doi.org/10.1109/TIP.2003.819861" target="_blank" rel="noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            IEEE Transactions on Image Processing
                          </a>
                        </Button>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium">A Wavelet Tour of Signal Processing</h4>
                        <p className="text-sm text-muted-foreground">Mallat, S. (2008). Academic Press</p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a href="https://doi.org/10.1016/B978-0-12-374370-1.X0001-8" target="_blank" rel="noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Academic Press
                          </a>
                        </Button>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium">Digital Image Processing</h4>
                        <p className="text-sm text-muted-foreground">Gonzalez, R. C., & Woods, R. E. (2017). Pearson</p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://www.pearson.com/us/higher-education/program/Gonzalez-Digital-Image-Processing-4th-Edition/PGM241219.html"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Pearson Education
                          </a>
                        </Button>
                      </div>
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
