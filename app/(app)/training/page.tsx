import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  Smartphone, 
  Clock, 
  Target, 
  Zap, 
  BookOpen, 
  Trophy, 
  Shield, 
  Brain,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Play,
  Lightbulb,
  CreditCard,
  Building2,
  Briefcase,
  Heart,
  FileText,
  Dice6
} from "lucide-react"
import { mockScenarios } from "@/data/scenarios"
import { allEnhancedScenarios } from "@/data/enhanced-scenarios"

export default function TrainingPage() {
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
      case 2: return "text-green-600 bg-green-100"
      case 3: return "text-yellow-600 bg-yellow-100"
      case 4:
      case 5: return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "upi": return <CreditCard className="h-6 w-6 text-blue-500" />
      case "banking": return <Building2 className="h-6 w-6 text-green-500" />
      case "employment": return <Briefcase className="h-6 w-6 text-purple-500" />
      case "investment": return <TrendingUp className="h-6 w-6 text-orange-500" />
      case "romance": return <Heart className="h-6 w-6 text-pink-500" />
      case "tax": return <FileText className="h-6 w-6 text-indigo-500" />
      case "lottery": return <Dice6 className="h-6 w-6 text-yellow-500" />
      default: return <Shield className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Shield className="h-4 w-4" />
              Interactive Training
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Security Training Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master cybersecurity through realistic simulations tailored for the Indian threat landscape
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="enhanced" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="enhanced" className="flex items-center gap-2 text-base">
              <Brain className="h-5 w-5" />
              Advanced Training
            </TabsTrigger>
            <TabsTrigger value="quick" className="flex items-center gap-2 text-base">
              <Zap className="h-5 w-5" />
              Quick Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enhanced" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allEnhancedScenarios.map((scenario, index) => (
                <Card key={scenario.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden flex flex-col">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${getDifficultyColor(scenario.difficulty)} border-0 font-semibold`}>
                      Level {scenario.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    {getCategoryIcon(scenario.category)}
                  </div>

                  <CardHeader className="pt-16 space-y-4 flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                      {scenario.type === "email" ? (
                        <Mail className="h-5 w-5 text-primary" />
                      ) : (
                        <Smartphone className="h-5 w-5 text-primary" />
                      )}
                      <Badge variant="secondary" className="text-xs font-medium">
                        {scenario.category.toUpperCase()}
                      </Badge>
                      {scenario.region === "india" && (
                        <Badge variant="outline" className="text-xs">
                          🇮🇳 Indian Context
                        </Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
                      {scenario.title}
                    </CardTitle>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {scenario.estimatedTime}m
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Trophy className="h-4 w-4" />
                            {scenario.points} pts
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {scenario.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                        {scenario.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{scenario.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 mt-auto">
                    <Link href={`/enhanced-simulate/${scenario.id}`}>
                      <Button className="w-full group-hover:bg-primary/90 transition-all duration-300 h-12 text-base font-semibold">
                        <Play className="h-5 w-5 mr-2" />
                        Start Training
                        <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockScenarios.map((scenario) => (
                <Card key={scenario.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500/50 flex flex-col">
                  <CardHeader className="space-y-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {scenario.type === "email" ? (
                          <Mail className="h-5 w-5 text-green-600" />
                        ) : (
                          <Smartphone className="h-5 w-5 text-green-600" />
                        )}
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {scenario.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-semibold">{scenario.points}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                      {scenario.title}
                    </CardTitle>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Difficulty {scenario.difficulty}/5
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        ~3 min
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="mt-auto">
                    <Link href={`/simulate/${scenario.id}`}>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all duration-300 h-12 text-base font-semibold"
                      >
                        <Lightbulb className="h-5 w-5 mr-2" />
                        Quick Practice
                        <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}