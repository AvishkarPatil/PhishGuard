"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shield, ArrowRight, Star, Play, ChevronDown, Brain, AlertTriangle, Zap, Users, BarChart3 } from "lucide-react"

export default function CybersecurityHomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Simulations",
      description:
        "Advanced machine learning creates hyper-realistic, adaptive phishing scenarios that evolve with threats",
      color: "bg-primary",
    },
    {
      icon: Zap,
      title: "Real-Time Coaching",
      description: "Instant AI guidance and personalized feedback during simulations for maximum learning impact",
      color: "bg-success",
    },
    {
      icon: Users,
      title: "Multi-Step Training",
      description: "Comprehensive learning journeys with intro, practice, assessment, and mastery phases",
      color: "bg-primary/80",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Deep insights into user behavior, risk patterns, and training effectiveness with predictive modeling",
      color: "bg-muted-foreground",
    },
  ]

  const stats = [
    { value: "99.8%", label: "Detection Accuracy" },
    { value: "500K+", label: "Threats Blocked" },
    { value: "24/7", label: "Threat Monitoring" },
    { value: "SOC 2", label: "Compliance Ready" },
  ]

  const testimonials = [
    {
      quote: "PhishGuard transformed our security posture. Our click-through rates dropped 85% in just 3 months.",
      author: "Sarah Chen",
      role: "CISO, TechCorp",
      company: "Fortune 500 Technology Company",
    },
    {
      quote:
        "The AI-powered simulations are incredibly realistic. Our team is now spotting threats we never noticed before.",
      author: "Marcus Rodriguez",
      role: "Security Director",
      company: "Global Financial Services",
    },
    {
      quote: "Best ROI we've seen from any security training platform. The gamification keeps our employees engaged.",
      author: "Dr. Emily Watson",
      role: "Chief Security Officer",
      company: "Healthcare Network",
    },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <nav className="fixed top-0 w-full z-50 glass-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">PhishGuard</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </a>
              <a href="#simulations" className="text-muted-foreground hover:text-foreground transition-colors">
                Simulations
              </a>
              <a href="#analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </a>
              <a href="#enterprise" className="text-muted-foreground hover:text-foreground transition-colors">
                Enterprise
              </a>
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="glass-card bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">95% of cyber attacks start with phishing</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-bold leading-tight max-w-5xl mx-auto">
              <span className="gradient-text">Next-Gen Phishing</span>
              <br />
              <span className="text-foreground">Defense Training</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Revolutionary AI-powered cybersecurity training with multi-step simulations, real-time coaching, and
              gamified learning experiences that transform security awareness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6">
                Start Training Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 group glass-card bg-transparent">
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Interactive Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-0 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Advanced Training Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Multi-layered security awareness training with AI guidance, real-time coaching, gamification, and
              comprehensive threat intelligence integration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-500 glass-card hover:shadow-2xl hover:shadow-primary/20 border-0"
              >
                <CardContent className="p-8 space-y-6">
                  <div
                    className={`p-4 rounded-xl ${feature.color} w-fit group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <h3 className="text-4xl font-bold">Trusted by Security Leaders</h3>
            <p className="text-xl text-muted-foreground">
              Join thousands of security professionals protecting their organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic leading-relaxed">"{testimonial.quote}"</blockquote>
                  <div className="space-y-1">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
        </div>

        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-5xl lg:text-6xl font-bold text-white">Transform Your Security Posture</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join the next generation of cybersecurity training. Protect your organization with AI-powered simulations,
            multi-step learning journeys, and real-time threat intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90"
              >
                Begin Training Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-white text-white hover:bg-white/10 glass-card bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-xl">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">PhishGuard</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Next-generation cybersecurity training with AI-powered simulations and real-time threat intelligence.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/auth/signup" className="block hover:text-foreground transition-colors">
                  Training
                </Link>
                <Link href="/auth/signup" className="block hover:text-foreground transition-colors">
                  Simulations
                </Link>
                <Link href="/auth/signup" className="block hover:text-foreground transition-colors">
                  Analytics
                </Link>
                <Link href="/auth/signup" className="block hover:text-foreground transition-colors">
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 PhishGuard. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
