"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Shield, Clock, Search, ExternalLink, Filter, TrendingUp, Globe, Users, Eye } from "lucide-react"

// Mock threat intelligence data
const mockThreatData = [
  {
    id: "threat-001",
    title: "New UPI QR Code Scam Targeting Indian Users",
    severity: "High",
    category: "Mobile Banking",
    description: "Attackers are using fake UPI QR codes in public places to steal banking credentials.",
    timestamp: "2024-01-15T10:30:00Z",
    source: "CERT-In",
    indicators: ["Fake QR codes", "UPI payment requests", "Public WiFi exploitation"],
    mitigation: "Always verify QR codes before scanning, use official banking apps only",
  },
  {
    id: "threat-002",
    title: "Phishing Campaign Impersonating Government Tax Portals",
    severity: "High",
    category: "Government Impersonation",
    description: "Sophisticated phishing emails mimicking income tax department communications.",
    timestamp: "2024-01-14T15:45:00Z",
    source: "PhishGuard Intelligence",
    indicators: ["Fake tax refund emails", "Lookalike domains", "Urgent payment requests"],
    mitigation: "Always access tax portals directly, verify sender authenticity",
  },
  {
    id: "threat-003",
    title: "WhatsApp Business Account Verification Scam",
    severity: "Medium",
    category: "Social Engineering",
    description: "Scammers requesting OTP codes for fake business account verification.",
    timestamp: "2024-01-14T09:20:00Z",
    source: "Social Media Intelligence",
    indicators: ["Unsolicited verification requests", "OTP phishing", "Fake business profiles"],
    mitigation: "Never share OTP codes, verify requests through official channels",
  },
  {
    id: "threat-004",
    title: "Cryptocurrency Investment Fraud on Social Platforms",
    severity: "Medium",
    category: "Financial Fraud",
    description: "Fake investment schemes promising guaranteed returns on cryptocurrency.",
    timestamp: "2024-01-13T18:10:00Z",
    source: "Financial Intelligence Unit",
    indicators: ["Guaranteed returns promises", "Celebrity endorsements", "Pressure tactics"],
    mitigation: "Research investment platforms thoroughly, be skeptical of guaranteed returns",
  },
  {
    id: "threat-005",
    title: "Fake Job Offer Scams Targeting Remote Workers",
    severity: "Low",
    category: "Employment Fraud",
    description: "Fraudulent job offers requesting upfront payments or personal information.",
    timestamp: "2024-01-13T12:00:00Z",
    source: "Employment Security Bureau",
    indicators: ["Upfront payment requests", "Too-good-to-be-true offers", "Vague job descriptions"],
    mitigation: "Verify company legitimacy, never pay for job opportunities",
  },
]

export default function ThreatFeedPage() {
  const [threats, setThreats] = useState(mockThreatData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading threat data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredThreats = threats.filter((threat) => {
    const matchesSearch =
      threat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = selectedSeverity === "all" || threat.severity === selectedSeverity

    return matchesSearch && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <AlertTriangle className="h-4 w-4" />
      case "Medium":
        return <Shield className="h-4 w-4" />
      case "Low":
        return <Shield className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <TrendingUp className="h-4 w-4" />
              Live Threat Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Threat Intelligence Feed
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay ahead of emerging cybersecurity threats with real-time intelligence tailored for the Indian threat landscape
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-200/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{threats.filter(t => t.severity === 'High').length}</p>
                  <p className="text-sm text-muted-foreground">High Severity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-200/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Shield className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{threats.filter(t => t.severity === 'Medium').length}</p>
                  <p className="text-sm text-muted-foreground">Medium Severity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{threats.length}</p>
                  <p className="text-sm text-muted-foreground">Total Threats</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Eye className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">24/7</p>
                  <p className="text-sm text-muted-foreground">Monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search threats, categories, or indicators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="px-4 py-2 bg-background/50 border border-input rounded-lg text-sm font-medium"
                  >
                    <option value="all">All Severities</option>
                    <option value="High">High Risk</option>
                    <option value="Medium">Medium Risk</option>
                    <option value="Low">Low Risk</option>
                  </select>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {filteredThreats.length} Results
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Threat Cards */}
        <div className="space-y-6">
          {filteredThreats.map((threat) => (
            <Card key={threat.id} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-primary/10">
              <div className={`h-1 w-full rounded-t-lg ${threat.severity === 'High' ? 'bg-gradient-to-r from-red-500 to-red-600' : threat.severity === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`} />
              
              <CardHeader className="space-y-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`${getSeverityColor(threat.severity)} font-semibold px-3 py-1`}>
                        {getSeverityIcon(threat.severity)}
                        <span className="ml-2">{threat.severity} Risk</span>
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                        {threat.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {threat.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(threat.timestamp).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed text-foreground/80">
                  {threat.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-0">
                {/* Threat Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Threat Indicators</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {threat.indicators.map((indicator, index) => (
                      <Badge key={index} variant="outline" className="bg-destructive/5 text-destructive border-destructive/20 hover:bg-destructive/10 transition-colors">
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mitigation Actions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <h4 className="font-semibold text-foreground">Recommended Actions</h4>
                  </div>
                  <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200/20 dark:border-green-800/20">
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {threat.mitigation}
                    </p>
                  </div>
                </div>

                {/* Enhanced Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Source:</span> {threat.source}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-sm hover:bg-primary/10 hover:text-primary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Share Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredThreats.length === 0 && (
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="py-16">
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No Threats Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    No threats match your current search criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
                <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedSeverity('all'); }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Transform Threats into Training</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Use these real-world threat insights to create compelling security awareness training scenarios for your organization.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="/training">Start Training</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/admin">Create Scenario</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
