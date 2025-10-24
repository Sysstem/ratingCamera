import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Zap, Target, Database, Smartphone, Brain, Globe, Shield } from "lucide-react"

interface Improvement {
  id: number
  title: string
  description: string
  category: string
  priority: "Высокий" | "Средний" | "Низкий"
  complexity: "Простая" | "Средняя" | "Сложная"
  icon: React.ReactNode
  benefits: string[]
  implementation: string[]
}

const improvements: Improvement[] = [
  {
    id: 1,
    title: "Машинное обучение для анализа качества",
    description:
      "Интеграция нейронных сетей для более точной оценки качества изображений с использованием deep learning подходов.",
    category: "Алгоритмы",
    priority: "Высокий",
    complexity: "Сложная",
    icon: <Brain className="h-5 w-5" />,
    benefits: [
      "Повышение точности анализа на 15-20%",
      "Автоматическое обучение на новых данных",
      "Адаптация к различным типам сцен",
      "Выявление сложных паттернов качества",
    ],
    implementation: [
      "Сбор и разметка обучающего датасета",
      "Обучение CNN для анализа изображений",
      "Интеграция TensorFlow.js в веб-приложение",
      "A/B тестирование с текущими алгоритмами",
    ],
  },
  {
    id: 2,
    title: "Мобильное приложение",
    description:
      "Разработка нативного мобильного приложения для iOS и Android с возможностью съемки и анализа в реальном времени.",
    category: "Платформа",
    priority: "Высокий",
    complexity: "Сложная",
    icon: <Smartphone className="h-5 w-5" />,
    benefits: [
      "Удобство использования на мобильных устройствах",
      "Анализ в реальном времени при съемке",
      "Доступ к метаданным камеры",
      "Офлайн режим работы",
    ],
    implementation: [
      "Разработка на React Native или Flutter",
      "Портирование алгоритмов анализа",
      "Интеграция с камерой устройства",
      "Оптимизация производительности",
    ],
  },
  {
    id: 3,
    title: "Расширенная база данных камер",
    description:
      "Создание comprehensive базы данных с техническими характеристиками камер и результатами тестирований.",
    category: "Данные",
    priority: "Средний",
    complexity: "Средняя",
    icon: <Database className="h-5 w-5" />,
    benefits: [
      "Более точное сравнение камер",
      "Исторические данные и тренды",
      "API для сторонних разработчиков",
      "Автоматическое обновление информации",
    ],
    implementation: [
      "Дизайн схемы базы данных",
      "Парсинг данных с сайтов производителей",
      "Создание REST API",
      "Система версионирования данных",
    ],
  },
  {
    id: 4,
    title: "Анализ видео качества",
    description:
      "Добавление возможности анализа качества видеозаписи с оценкой стабилизации, резкости в движении и цветопередачи.",
    category: "Функциональность",
    priority: "Средний",
    complexity: "Сложная",
    icon: <Target className="h-5 w-5" />,
    benefits: [
      "Комплексная оценка камеры",
      "Анализ стабилизации изображения",
      "Оценка качества в динамике",
      "Сравнение видео возможностей",
    ],
    implementation: [
      "Алгоритмы анализа видео потока",
      "Метрики качества для видео",
      "Оптимизация обработки больших файлов",
      "UI для загрузки и просмотра видео",
    ],
  },
  {
    id: 5,
    title: "Облачная обработка изображений",
    description:
      "Перенос вычислительно сложных алгоритмов в облако для ускорения обработки и поддержки больших изображений.",
    category: "Инфраструктура",
    priority: "Средний",
    complexity: "Средняя",
    icon: <Zap className="h-5 w-5" />,
    benefits: [
      "Ускорение обработки в 3-5 раз",
      "Поддержка RAW форматов",
      "Масштабируемость системы",
      "Снижение нагрузки на клиент",
    ],
    implementation: [
      "Контейнеризация алгоритмов",
      "Развертывание в AWS/Google Cloud",
      "Очереди задач для обработки",
      "Мониторинг и логирование",
    ],
  },
  {
    id: 6,
    title: "Многоязычная поддержка",
    description: "Локализация интерфейса на английский, китайский и другие языки для международного использования.",
    category: "Локализация",
    priority: "Низкий",
    complexity: "Простая",
    icon: <Globe className="h-5 w-5" />,
    benefits: [
      "Расширение аудитории пользователей",
      "Международное признание проекта",
      "Культурная адаптация интерфейса",
      "SEO оптимизация для разных регионов",
    ],
    implementation: [
      "Настройка i18n в Next.js",
      "Перевод всех текстов интерфейса",
      "Адаптация форматов дат и чисел",
      "Тестирование на разных языках",
    ],
  },
  {
    id: 7,
    title: "Система пользователей и профилей",
    description:
      "Добавление регистрации пользователей с возможностью сохранения истории анализов и создания персональных рейтингов.",
    category: "Пользователи",
    priority: "Средний",
    complexity: "Средняя",
    icon: <Shield className="h-5 w-5" />,
    benefits: [
      "Персонализация опыта использования",
      "История анализов пользователя",
      "Социальные функции и сравнения",
      "Аналитика использования системы",
    ],
    implementation: [
      "Система аутентификации",
      "База данных пользователей",
      "Профили и настройки",
      "GDPR совместимость",
    ],
  },
  {
    id: 8,
    title: "Интеграция с социальными сетями",
    description: "Возможность делиться результатами анализа в социальных сетях с красивыми карточками и инфографикой.",
    category: "Интеграция",
    priority: "Низкий",
    complexity: "Простая",
    icon: <Globe className="h-5 w-5" />,
    benefits: [
      "Вирусный маркетинг проекта",
      "Увеличение пользовательской базы",
      "Обратная связь от сообщества",
      "Повышение узнаваемости бренда",
    ],
    implementation: [
      "Open Graph метатеги",
      "Генерация красивых карточек",
      "API интеграция с соцсетями",
      "Кнопки шаринга в интерфейсе",
    ],
  },
]

export default function ImprovementsPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Высокий":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Средний":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Низкий":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Сложная":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "Средняя":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Простая":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Возможные улучшения</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/">Главная</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/team">Команда</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">Возможные улучшения системы</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Планы развития и модернизации системы оценки качества камер телефонов
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{improvements.length}</p>
                  <p className="text-sm text-muted-foreground">Предложений</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{improvements.filter((i) => i.priority === "Высокий").length}</p>
                  <p className="text-sm text-muted-foreground">Высокий приоритет</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{improvements.filter((i) => i.complexity === "Сложная").length}</p>
                  <p className="text-sm text-muted-foreground">Сложные задачи</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{improvements.filter((i) => i.complexity === "Простая").length}</p>
                  <p className="text-sm text-muted-foreground">Быстрые победы</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improvements List */}
        <div className="space-y-6">
          {improvements.map((improvement) => (
            <Card key={improvement.id} className="border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {improvement.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{improvement.title}</CardTitle>
                      <CardDescription className="text-base">{improvement.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getPriorityColor(improvement.priority)}>{improvement.priority}</Badge>
                    <Badge className={getComplexityColor(improvement.complexity)}>{improvement.complexity}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="outline">{improvement.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Преимущества</h4>
                    <ul className="space-y-2">
                      {improvement.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">План реализации</h4>
                    <ol className="space-y-2">
                      {improvement.implementation.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-5 h-5 bg-primary/10 text-primary rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Implementation Roadmap */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Дорожная карта развития</CardTitle>
            <CardDescription>Предлагаемая последовательность реализации улучшений</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Фаза 1: Основные улучшения (3-6 месяцев)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Приоритетные задачи:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Машинное обучение для анализа качества</li>
                      <li>• Облачная обработка изображений</li>
                      <li>• Расширенная база данных камер</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Ожидаемые результаты:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Повышение точности анализа на 20%</li>
                      <li>• Ускорение обработки в 3-5 раз</li>
                      <li>• Поддержка 100+ моделей камер</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Фаза 2: Расширение функциональности (6-12 месяцев)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Развитие платформы:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Мобильное приложение</li>
                      <li>• Анализ видео качества</li>
                      <li>• Система пользователей и профилей</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Целевые метрики:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 10,000+ активных пользователей</li>
                      <li>• Поддержка iOS и Android</li>
                      <li>• Анализ фото и видео</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Фаза 3: Глобализация (12+ месяцев)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Международное развитие:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Многоязычная поддержка</li>
                      <li>• Интеграция с социальными сетями</li>
                      <li>• Партнерства с производителями</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Глобальные цели:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Поддержка 10+ языков</li>
                      <li>• 100,000+ пользователей</li>
                      <li>• Признание индустрии</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Присоединяйтесь к развитию проекта</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Мы открыты для сотрудничества и приглашаем разработчиков, исследователей и энтузиастов присоединиться к
              развитию системы оценки качества камер.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="https://github.com/team-camera-rating" target="_blank" rel="noreferrer">
                  Посмотреть на GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/team">Связаться с командой</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
