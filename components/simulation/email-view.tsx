"use client"
import type { Scenario } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, User, LinkIcon } from "lucide-react"

interface EmailViewProps {
  scenario: Scenario
}

export function EmailView({ scenario }: EmailViewProps) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <Badge variant="secondary">Email Simulation</Badge>
        </div>

        <div className="space-y-3 border-b border-border pb-4">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground font-medium">From:</span>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{scenario.fromName}</span>
              <span className="text-muted-foreground">&lt;{scenario.fromAddress}&gt;</span>
            </div>

            <span className="text-muted-foreground font-medium">Subject:</span>
            <span className="font-medium">{scenario.subject}</span>

            <span className="text-muted-foreground font-medium">Date:</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div
            dangerouslySetInnerHTML={{ __html: scenario.bodyHtml || "" }}
            className="space-y-4 [&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer"
          />
        </div>

        {scenario.linkUrl && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
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
      </CardContent>
    </Card>
  )
}
