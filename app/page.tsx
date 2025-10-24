import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, BarChart3, FileText, Users, Zap, Target, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-balance">Система оценки камер</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
                Анализ
              </Link>
              <Link href="/rating" className="text-muted-foreground hover:text-foreground transition-colors">
                Рейтинг
              </Link>
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Документация
              </Link>
              <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                Команда
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient grid-pattern py-24 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Академический проект
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Система оценки качества <span className="text-primary">камер телефонов</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Программа для составления рейтинга цифровых камер в телефонах, учитывающая различные критерии качества
            получаемых изображений
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/analyze">
                <Upload className="mr-2 h-5 w-5" />
                Начать анализ
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/docs">
                <FileText className="mr-2 h-5 w-5" />
                Документация
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Возможности системы</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Комплексный анализ качества изображений с научно обоснованными метриками
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Автоматический анализ</CardTitle>
                <CardDescription>
                  Загрузите изображения и получите детальный анализ качества по множеству параметров
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Научные метрики</CardTitle>
                <CardDescription>
                  Оценка резкости, шума, цветопередачи, контраста и других параметров качества
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Рейтинг камер</CardTitle>
                <CardDescription>
                  Составление объективного рейтинга на основе комплексной оценки всех параметров
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Подробная документация</CardTitle>
                <CardDescription>
                  Описание всех метрик с ссылками на научные статьи и методологию расчета
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Командная работа</CardTitle>
                <CardDescription>
                  Проект разработан командой студентов с четким распределением ролей и задач
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Результаты тестирования</CardTitle>
                <CardDescription>Реальные результаты тестирования камер группы с детальным анализом</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics Preview */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Анализируемые метрики</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Система оценивает качество изображений по следующим параметрам
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Резкость", description: "Четкость деталей изображения", value: "SSIM, Laplacian" },
              { name: "Шум", description: "Уровень цифрового шума", value: "SNR, PSNR" },
              { name: "Цветопередача", description: "Точность воспроизведения цветов", value: "Delta E, Gamut" },
              { name: "Контраст", description: "Динамический диапазон", value: "RMS, Michelson" },
              { name: "Экспозиция", description: "Правильность освещения", value: "Histogram, Zones" },
              { name: "Искажения", description: "Геометрические искажения", value: "Barrel, Pincushion" },
              { name: "Виньетирование", description: "Затемнение по краям", value: "Radial falloff" },
              { name: "Хроматические аберрации", description: "Цветовые искажения", value: "CA index" },
            ].map((metric, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription className="text-sm">{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="text-xs">
                    {metric.value}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">Готовы протестировать свою камеру?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Загрузите изображения и получите профессиональную оценку качества
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/analyze">
              <Camera className="mr-2 h-5 w-5" />
              Начать тестирование
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-primary" />
                <span className="font-bold">Система оценки камер</span>
              </div>
              <p className="text-sm text-muted-foreground">Академический проект для оценки качества камер телефонов</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <div className="space-y-2 text-sm">
                <Link href="/analyze" className="block text-muted-foreground hover:text-foreground">
                  Анализ изображений
                </Link>
                <Link href="/rating" className="block text-muted-foreground hover:text-foreground">
                  Рейтинг камер
                </Link>
                <Link href="/docs" className="block text-muted-foreground hover:text-foreground">
                  Документация
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Проект</h3>
              <div className="space-y-2 text-sm">
                <Link href="/team" className="block text-muted-foreground hover:text-foreground">
                  Команда
                </Link>
                <Link href="/improvements" className="block text-muted-foreground hover:text-foreground">
                  Улучшения
                </Link>
                <a href="https://github.com" className="block text-muted-foreground hover:text-foreground">
                  GitHub
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <p className="text-sm text-muted-foreground">Преподаватель: Верещагин В.Ю.</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Система оценки качества камер телефонов. Академический проект.
          </div>
        </div>
      </footer>
    </div>
  )
}
