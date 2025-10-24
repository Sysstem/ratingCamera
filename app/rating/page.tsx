import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Trophy, Star, TrendingUp, Medal, Award } from "lucide-react"

interface CameraRating {
  id: number
  brand: string
  model: string
  overallScore: number
  sharpness: number
  noise: number
  colorAccuracy: number
  contrast: number
  rank: number
  tested: boolean
}

const cameraRatings: CameraRating[] = [
  {
    id: 1,
    brand: "iPhone",
    model: "15 Pro Max",
    overallScore: 92.5,
    sharpness: 95,
    noise: 91,
    colorAccuracy: 94,
    contrast: 90,
    rank: 1,
    tested: true,
  },
  {
    id: 2,
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    overallScore: 90.8,
    sharpness: 93,
    noise: 89,
    colorAccuracy: 92,
    contrast: 89,
    rank: 2,
    tested: true,
  },
  {
    id: 3,
    brand: "Google",
    model: "Pixel 8 Pro",
    overallScore: 89.2,
    sharpness: 91,
    noise: 88,
    colorAccuracy: 90,
    contrast: 87,
    rank: 3,
    tested: true,
  },
  {
    id: 4,
    brand: "Xiaomi",
    model: "14 Ultra",
    overallScore: 87.6,
    sharpness: 89,
    noise: 86,
    colorAccuracy: 88,
    contrast: 87,
    rank: 4,
    tested: false,
  },
  {
    id: 5,
    brand: "OnePlus",
    model: "12 Pro",
    overallScore: 85.3,
    sharpness: 87,
    noise: 84,
    colorAccuracy: 86,
    contrast: 84,
    rank: 5,
    tested: false,
  },
  {
    id: 6,
    brand: "Huawei",
    model: "P60 Pro",
    overallScore: 83.7,
    sharpness: 85,
    noise: 82,
    colorAccuracy: 84,
    contrast: 83,
    rank: 6,
    tested: false,
  },
]

export default function RatingPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 85) return "text-yellow-500"
    if (score >= 80) return "text-orange-500"
    return "text-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Отлично"
    if (score >= 85) return "Хорошо"
    if (score >= 80) return "Удовлетворительно"
    return "Требует улучшения"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Рейтинг камер</span>
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
          <h1 className="text-4xl font-bold mb-4 text-balance">Рейтинг камер телефонов</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Объективная оценка качества камер на основе комплексного анализа изображений
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{cameraRatings.length}</p>
                  <p className="text-sm text-muted-foreground">Камер в рейтинге</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{cameraRatings.filter((c) => c.tested).length}</p>
                  <p className="text-sm text-muted-foreground">Протестировано</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.max(...cameraRatings.map((c) => c.overallScore)).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Лучший результат</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {(cameraRatings.reduce((sum, c) => sum + c.overallScore, 0) / cameraRatings.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Средний балл</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Table */}
        <Card>
          <CardHeader>
            <CardTitle>Рейтинг камер по результатам тестирования</CardTitle>
            <CardDescription>
              Камеры ранжированы по общему баллу, рассчитанному на основе всех метрик качества
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cameraRatings.map((camera) => (
                <Card key={camera.id} className={`${camera.tested ? "border-primary/20" : "border-border/50"}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12">{getRankIcon(camera.rank)}</div>
                        <div>
                          <h3 className="text-xl font-bold">
                            {camera.brand} {camera.model}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={camera.tested ? "default" : "secondary"}>
                              {camera.tested ? "Протестировано" : "Ожидает тестирования"}
                            </Badge>
                            <Badge variant="outline">{getScoreLabel(camera.overallScore)}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(camera.overallScore)}`}>
                          {camera.overallScore.toFixed(1)}
                        </div>
                        <p className="text-sm text-muted-foreground">Общий балл</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Резкость</span>
                          <span className="text-sm font-bold">{camera.sharpness}</span>
                        </div>
                        <Progress value={camera.sharpness} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Шум</span>
                          <span className="text-sm font-bold">{camera.noise}</span>
                        </div>
                        <Progress value={camera.noise} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Цветопередача</span>
                          <span className="text-sm font-bold">{camera.colorAccuracy}</span>
                        </div>
                        <Progress value={camera.colorAccuracy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Контраст</span>
                          <span className="text-sm font-bold">{camera.contrast}</span>
                        </div>
                        <Progress value={camera.contrast} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Методология оценки</CardTitle>
            <CardDescription>Как рассчитывается итоговая оценка для составления рейтинга</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Весовые коэффициенты метрик</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Резкость</span>
                    <span className="font-mono">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Шум</span>
                    <span className="font-mono">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Цветопередача</span>
                    <span className="font-mono">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Контраст</span>
                    <span className="font-mono">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Экспозиция</span>
                    <span className="font-mono">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Искажения</span>
                    <span className="font-mono">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Виньетирование</span>
                    <span className="font-mono">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Хроматические аберрации</span>
                    <span className="font-mono">5%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Условия тестирования</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Дневное освещение (5500K)</p>
                  <p>• Расстояние до объекта: 1-3 метра (если тестировали съемку объекта, а не пейзажа)</p>
                  <p>• Автоматические настройки камеры</p>
                  <p>• Стабилизация включена</p>
                  <p>• Формат изображения: JPEG высокого качества</p>
                  <p>• Минимум 5 снимков для каждой камеры</p>
                  <p>• Анализ проводится на оригинальных файлах</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
