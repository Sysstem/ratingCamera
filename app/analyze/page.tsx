"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, BarChart3, FileImage, Zap, Target, AlertCircle } from "lucide-react"
import Image from "next/image"

interface AnalysisResult {
  sharpness: number
  noise: number
  colorAccuracy: number
  contrast: number
  exposure: number
  distortion: number
  vignetting: number
  chromaticAberration: number
  overallScore: number
}

export default function AnalyzePage() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

    if (files.length > 0) {
      setUploadedImages((prev) => [...prev, ...files])
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setUploadedImages((prev) => [...prev, ...files])
    }
  }, [])

  const analyzeImages = async () => {
    if (uploadedImages.length === 0) return

    setAnalyzing(true)

    // Симуляция анализа изображений
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Генерация случайных результатов для демонстрации
    const mockResults: AnalysisResult = {
      sharpness: Math.random() * 40 + 60, // 60-100
      noise: Math.random() * 30 + 70, // 70-100
      colorAccuracy: Math.random() * 35 + 65, // 65-100
      contrast: Math.random() * 25 + 75, // 75-100
      exposure: Math.random() * 30 + 70, // 70-100
      distortion: Math.random() * 20 + 80, // 80-100
      vignetting: Math.random() * 25 + 75, // 75-100
      chromaticAberration: Math.random() * 30 + 70, // 70-100
      overallScore: 0,
    }

    // Расчет общего балла
    mockResults.overallScore =
      mockResults.sharpness * 0.2 +
      mockResults.noise * 0.15 +
      mockResults.colorAccuracy * 0.15 +
      mockResults.contrast * 0.15 +
      mockResults.exposure * 0.1 +
      mockResults.distortion * 0.1 +
      mockResults.vignetting * 0.1 +
      mockResults.chromaticAberration * 0.05

    setResults(mockResults)
    setAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-yellow-500"
    if (score >= 70) return "text-orange-500"
    return "text-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Отлично"
    if (score >= 80) return "Хорошо"
    if (score >= 70) return "Удовлетворительно"
    return "Требует улучшения"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Анализ изображений</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/">Главная</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/rating">Рейтинг</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">Анализ качества изображений</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Загрузите изображения с вашей камеры для комплексного анализа качества
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Загрузка изображений
                </CardTitle>
                <CardDescription>Поддерживаются форматы: JPEG, PNG, WebP</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FileImage className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    {isDragActive ? (
                      <p className="text-primary">Отпустите файлы здесь...</p>
                    ) : (
                      <div>
                        <p className="mb-2">Перетащите изображения сюда или нажмите для выбора</p>
                        <p className="text-sm text-muted-foreground">
                          Рекомендуется загружать 3-5 изображений для точного анализа
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Загруженные изображения ({uploadedImages.length})</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`Uploaded ${index + 1}`}
                              width={200}
                              height={150}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={analyzeImages}
                  disabled={uploadedImages.length === 0 || analyzing}
                  className="w-full mt-6"
                  size="lg"
                >
                  {analyzing ? (
                    <>
                      <Zap className="mr-2 h-4 w-4 animate-spin" />
                      Анализируем...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Начать анализ
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Progress */}
            {analyzing && (
              <Card>
                <CardHeader>
                  <CardTitle>Процесс анализа</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Анализ резкости</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Оценка шума</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Анализ цветопередачи</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Результаты анализа
                  </CardTitle>
                  <CardDescription>Комплексная оценка качества изображений</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore.toFixed(1)}
                    </div>
                    <Badge variant="secondary">{getScoreLabel(results.overallScore)}</Badge>
                  </div>

                  <Tabs defaultValue="metrics" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="metrics">Метрики</TabsTrigger>
                      <TabsTrigger value="details">Детали</TabsTrigger>
                    </TabsList>

                    <TabsContent value="metrics" className="space-y-4">
                      {[
                        { name: "Резкость", value: results.sharpness, description: "Четкость деталей" },
                        { name: "Шум", value: results.noise, description: "Уровень цифрового шума" },
                        { name: "Цветопередача", value: results.colorAccuracy, description: "Точность цветов" },
                        { name: "Контраст", value: results.contrast, description: "Динамический диапазон" },
                        { name: "Экспозиция", value: results.exposure, description: "Правильность освещения" },
                        { name: "Искажения", value: results.distortion, description: "Геометрические искажения" },
                        { name: "Виньетирование", value: results.vignetting, description: "Затемнение по краям" },
                        {
                          name: "Хром. аберрации",
                          value: results.chromaticAberration,
                          description: "Цветовые искажения",
                        },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{metric.name}</span>
                              <p className="text-xs text-muted-foreground">{metric.description}</p>
                            </div>
                            <span className={`font-bold ${getScoreColor(metric.value)}`}>
                              {metric.value.toFixed(1)}
                            </span>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Рекомендации по улучшению</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Для повышения качества изображений рекомендуется улучшить стабилизацию и настройки
                              экспозиции в условиях слабого освещения.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Условия съемки</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              Освещение: <span className="text-muted-foreground">Дневное</span>
                            </div>
                            <div>
                              Фокус: <span className="text-muted-foreground">Автоматический</span>
                            </div>
                            <div>
                              ISO: <span className="text-muted-foreground">100-400</span>
                            </div>
                            <div>
                              Стабилизация: <span className="text-muted-foreground">Включена</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {!results && !analyzing && (
              <Card>
                <CardContent className="text-center py-12">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Готовы к анализу</h3>
                  <p className="text-muted-foreground">
                    Загрузите изображения и нажмите "Начать анализ" для получения результатов
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
