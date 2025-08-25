"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Lock, AlertTriangle } from "lucide-react"

interface BrowserViewProps {
  data: {
    url: string
    title: string
    content: string
  }
}

export function BrowserView({ data }: BrowserViewProps) {
  const isSecure = data.url.startsWith("https://")
  const domain = data.url.replace(/^https?:\/\//, "").split("/")[0]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="bg-muted/50 p-3 rounded-t-lg border-b">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2 bg-background rounded-md px-3 py-2">
          {isSecure ? <Lock className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-mono flex-1">{data.url}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.content }} />

          {/* Warning indicators */}
          {!isSecure && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Not Secure</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                This website does not use HTTPS encryption. Your data may be at risk.
              </p>
            </div>
          )}

          {domain.includes("co.in") && !domain.includes("gov.in") && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Suspicious Domain</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                This domain appears to mimic an official government website. Verify authenticity before proceeding.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
