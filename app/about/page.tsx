import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Target, Zap, Brain } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { value: "500K+", label: "Users Trained" },
    { value: "99.8%", label: "Threat Detection" },
    { value: "150+", label: "Countries" },
    { value: "24/7", label: "Threat Monitoring" },
  ]

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Security Officer",
      bio: "Former NSA cybersecurity expert with 15+ years in threat intelligence",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI Research",
      bio: "PhD in Machine Learning, specializing in adaptive security training systems",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Priya Sharma",
      role: "VP of Product",
      bio: "Expert in cybersecurity education with focus on Indian market threats",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">About PhishGuard</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We're revolutionizing cybersecurity training with AI-powered simulations, multi-step learning journeys,
              and real-time threat intelligence to build unbreakable security awareness.
            </p>
          </div>

          {/* Mission */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-0 space-y-6">
              <h2 className="text-3xl font-bold text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                To transform cybersecurity education through innovative AI technology, making security awareness
                training engaging, effective, and accessible to organizations worldwide. We believe that every employee
                can become a security champion with the right training and tools.
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">What Makes Us Different</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Learning",
                  description:
                    "Advanced machine learning adapts to each user's learning style and vulnerability patterns",
                },
                {
                  icon: Target,
                  title: "Indian Context Focus",
                  description: "Specialized scenarios covering UPI scams, Aadhaar fraud, and local threat vectors",
                },
                {
                  icon: Zap,
                  title: "Real-Time Intelligence",
                  description: "Live threat feeds and emerging attack patterns keep training current and relevant",
                },
              ].map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0 space-y-4">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-r from-primary to-secondary text-white text-center">
            <CardContent className="p-0 space-y-6">
              <h2 className="text-3xl font-bold">Ready to Transform Your Security?</h2>
              <p className="text-lg opacity-90">Join thousands of organizations building stronger security awareness</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Start Free Training
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
