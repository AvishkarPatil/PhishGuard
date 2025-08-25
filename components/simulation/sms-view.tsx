"use client"
import type { Scenario } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Clock, LinkIcon } from "lucide-react"

interface SmsViewProps {
  scenario: Scenario
}

export function SmsView({ scenario }: SmsViewProps) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          <Badge variant="secondary">SMS Simulation</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* SMS Interface Mockup */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Today {new Date().toLocaleTimeString()}</span>
            </div>

            <div className="bg-card p-3 rounded-lg border-l-4 border-l-primary">
              <p className="text-sm leading-relaxed">{scenario.smsText}</p>
            </div>
          </div>

          {scenario.linkUrl && (
            <div className="p-4 bg-muted rounded-lg">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 text-sm cursor-help">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Hover to inspect link destination</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Link Destination</h4>
                    <p className="text-sm text-muted-foreground break-all">{scenario.linkUrl}</p>
                    <p className="text-xs text-muted-foreground">Always verify link destinations before clicking</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
