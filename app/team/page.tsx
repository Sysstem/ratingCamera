import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Crown, Code, Database, Github, Mail } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  isLeader: boolean
  contributions: string[]
  skills: string[]
  github?: string
  email?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Саттарова Камилла",
    role: "UI/UX дизайнер",
    isLeader: false,
    contributions: [
      "Дизайн пользовательского интерфейса",
      "Создание интерактивных прототипов",
      "Разработка системы визуализации метрик",
      "UX исследования и тестирование удобства",
      "Создание брендинга и графических элементов",
    ],
    skills: ["Figma", "Adobe Creative Suite", "CSS", "HTML", "Prototyping"],
    github: "Kamilla-star",
    email: "satkamilla@mail.ru",
  },
  
  {
    id: 2,
    name: "Тихонов Валерий",
    role: "Backend + Frontend разработчик",
    isLeader: true,
    contributions: [
      "Разработка API для обработки изображений",
      "Создание системы хранения результатов",
      "Реализация алгоритмов расчета рейтинга",
      "Оптимизация обработки больших изображений",
      "Настройка базы данных и кэширования",
    ],
    skills: ["JS", "Node.js", "Python", "PostgreSQL", "Redis", "Docker"],
    github: "Syssstem",
    email: "samtabgal14@gmail.com",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Команда проекта</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <a href="/">Главная</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/docs">Документация</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">Команда разработчиков</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Состав участников проекта и описание вклада каждого члена команды
          </p>
        </div>

        {/* Project Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>О проекте</CardTitle>
            <CardDescription>Информация о проекте и методологии командной работы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Цель проекта</h3>
                <p className="text-sm text-muted-foreground">
                  Создание программы для составления рейтинга цифровых камер в телефонах с использованием научно
                  обоснованных метрик качества изображений.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Методология</h3>
                <p className="text-sm text-muted-foreground">
                  Agile разработка с еженедельными спринтами, использование Git для контроля версий, code review и
                  парное программирование.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Технологии</h3>
                <div className="flex flex-wrap gap-1">
                  {["Next.js", "TypeScript", "Python", "OpenCV", "Tailwind CSS"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <div className="space-y-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className={member.isLeader ? "border-primary/50 bg-primary/5" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {member.name}
                      {member.isLeader && <Crown className="h-5 w-5 text-yellow-500" />}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {member.role}
                      {member.isLeader && (
                        <Badge variant="default" className="text-xs">
                          Лидер команды
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {member.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Вклад в проект
                    </h4>
                    <ul className="space-y-2">
                      {member.contributions.map((contribution, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Технические навыки
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Git Workflow */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Организация работы с Git
            </CardTitle>
            <CardDescription>Методология контроля версий и совместной разработки</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Структура репозитория</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • <strong>main</strong> - основная ветка для продакшена
                  </li>
                  <li>
                    • <strong>develop</strong> - ветка для интеграции новых функций
                  </li>
                  <li>
                    • <strong>feature/*</strong> - ветки для разработки новых функций
                  </li>
                  <li>
                    • <strong>hotfix/*</strong> - ветки для исправления критических ошибок
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Процесс разработки</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Создание feature branch от develop</li>
                  <li>• Регулярные коммиты с описательными сообщениями</li>
                  <li>• Pull Request с обязательным code review</li>
                  <li>• Merge в develop после одобрения</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Контактная информация</CardTitle>
            <CardDescription>Связь с командой и преподавателем</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Команда</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Лидер команды:</strong> Тихонов Валерий
                  </p>
                  <p>
                    <strong>Email:</strong> samtabgal14@gmail.com
                  </p>
                  <p>
                    <strong>GitHub:</strong>{"Syssstem"}
                    <a href="https://github.com/Sysstem/ratingCamera" className="text-primary hover:underline">
                      github.com/team-camera-rating
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Преподаватель</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Верещагин Владислав Юрьевич</strong>
                  </p>
                  <p className="text-muted-foreground">Ведущий преподаватель курса</p>
                  <p className="text-muted-foreground">Проведение очного тестирования камер группы</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
