"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CreateScenarioForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    type: "email" as "email" | "sms",
    title: "",
    difficulty: 1,
    points: 100,
    fromName: "",
    fromAddress: "",
    subject: "",
    bodyHtml: "",
    smsText: "",
    linkUrl: "",
    isPhish: true,
    phishSignalHints: [] as string[],
    redFlags: [] as string[],
  })

  const [newHint, setNewHint] = useState("")
  const [newRedFlag, setNewRedFlag] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.title || !formData.linkUrl) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (formData.type === "email" && (!formData.subject || !formData.bodyHtml)) {
      toast({
        title: "Validation Error",
        description: "Email scenarios require subject and body content.",
        variant: "destructive",
      })
      return
    }

    if (formData.type === "sms" && !formData.smsText) {
      toast({
        title: "Validation Error",
        description: "SMS scenarios require message text.",
        variant: "destructive",
      })
      return
    }

    // Create scenario object
    const newScenario = {
      id: `scenario-${Date.now()}`,
      type: formData.type,
      title: formData.title,
      difficulty: formData.difficulty as 1 | 2 | 3 | 4 | 5,
      points: formData.points,
      fromName: formData.fromName,
      fromAddress: formData.fromAddress,
      subject: formData.subject,
      bodyHtml: formData.bodyHtml,
      smsText: formData.smsText,
      linkUrl: formData.linkUrl,
      phishSignalHints: formData.phishSignalHints,
      answerKey: {
        isPhish: formData.isPhish,
        redFlags: formData.redFlags,
      },
    }

    // In a real app, this would save to Firebase
    console.log("New scenario created:", newScenario)

    toast({
      title: "Scenario Created",
      description: `"${formData.title}" has been added to the training library.`,
    })

    // Reset form
    setFormData({
      type: "email",
      title: "",
      difficulty: 1,
      points: 100,
      fromName: "",
      fromAddress: "",
      subject: "",
      bodyHtml: "",
      smsText: "",
      linkUrl: "",
      isPhish: true,
      phishSignalHints: [],
      redFlags: [],
    })
  }

  const addHint = () => {
    if (newHint.trim()) {
      setFormData({
        ...formData,
        phishSignalHints: [...formData.phishSignalHints, newHint.trim()],
      })
      setNewHint("")
    }
  }

  const removeHint = (index: number) => {
    setFormData({
      ...formData,
      phishSignalHints: formData.phishSignalHints.filter((_, i) => i !== index),
    })
  }

  const addRedFlag = () => {
    if (newRedFlag.trim()) {
      setFormData({
        ...formData,
        redFlags: [...formData.redFlags, newRedFlag.trim()],
      })
      setNewRedFlag("")
    }
  }

  const removeRedFlag = (index: number) => {
    setFormData({
      ...formData,
      redFlags: formData.redFlags.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Scenario</CardTitle>
          <CardDescription>Design a new phishing awareness training scenario for your users</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Scenario Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "email" | "sms") => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Scenario Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Suspicious Bank Alert"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty (1-5)</Label>
                <Select
                  value={formData.difficulty.toString()}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Beginner</SelectItem>
                    <SelectItem value="2">2 - Easy</SelectItem>
                    <SelectItem value="3">3 - Medium</SelectItem>
                    <SelectItem value="4">4 - Hard</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">Points Reward</Label>
                <Input
                  id="points"
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) })}
                  min="10"
                  max="500"
                  step="10"
                />
              </div>
            </div>

            {/* Email-specific fields */}
            {formData.type === "email" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={formData.fromName}
                      onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                      placeholder="e.g., Bank Security Team"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromAddress">From Email</Label>
                    <Input
                      id="fromAddress"
                      value={formData.fromAddress}
                      onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                      placeholder="e.g., security@bank-alerts.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., URGENT: Verify Your Account"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyHtml">Email Body (HTML)</Label>
                  <Textarea
                    id="bodyHtml"
                    value={formData.bodyHtml}
                    onChange={(e) => setFormData({ ...formData, bodyHtml: e.target.value })}
                    placeholder="Enter the email body content with HTML formatting..."
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* SMS-specific fields */}
            {formData.type === "sms" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">SMS Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="smsText">SMS Message</Label>
                  <Textarea
                    id="smsText"
                    value={formData.smsText}
                    onChange={(e) => setFormData({ ...formData, smsText: e.target.value })}
                    placeholder="Enter the SMS message content..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Common fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkUrl">Target Link URL</Label>
                <Input
                  id="linkUrl"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  placeholder="e.g., http://fake-bank-site.com/login"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPhish"
                  checked={formData.isPhish}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPhish: checked })}
                />
                <Label htmlFor="isPhish">This is a phishing attempt</Label>
              </div>
            </div>

            {/* Phishing Signal Hints */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Phishing Signal Hints</h3>
              <div className="flex gap-2">
                <Input
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  placeholder="Add a hint (e.g., Urgent language)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHint())}
                />
                <Button type="button" onClick={addHint} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.phishSignalHints.map((hint, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {hint}
                    <button type="button" onClick={() => removeHint(index)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Educational Red Flags</h3>
              <div className="flex gap-2">
                <Input
                  value={newRedFlag}
                  onChange={(e) => setNewRedFlag(e.target.value)}
                  placeholder="Add a red flag explanation"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRedFlag())}
                />
                <Button type="button" onClick={addRedFlag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.redFlags.map((flag, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1 text-sm">{flag}</span>
                    <button type="button" onClick={() => removeRedFlag(index)}>
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Create Scenario
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "Hide" : "Preview"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview */}
      {isPreview && (
        <Card>
          <CardHeader>
            <CardTitle>Scenario Preview</CardTitle>
            <CardDescription>How this scenario will appear to users</CardDescription>
          </CardHeader>
          <CardContent>
            {formData.type === "email" ? (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>From:</strong> {formData.fromName} &lt;{formData.fromAddress}&gt;
                  </div>
                  <div className="text-sm">
                    <strong>Subject:</strong> {formData.subject}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div dangerouslySetInnerHTML={{ __html: formData.bodyHtml }} />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">SMS Message:</div>
                <div className="p-3 bg-card rounded border-l-4 border-l-primary">{formData.smsText}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
