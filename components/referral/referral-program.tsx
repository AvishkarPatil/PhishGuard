"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Share2, Gift, Copy, Mail, MessageSquare } from "lucide-react"

interface ReferralProgramProps {
  referralCode: string
  referralsCount: number
  pointsEarned: number
  tier: "Bronze" | "Silver" | "Gold" | "Platinum"
}

export function ReferralProgram({ referralCode, referralsCount, pointsEarned, tier }: ReferralProgramProps) {
  const [shareMethod, setShareMethod] = useState<"link" | "email" | "whatsapp">("link")
  const { toast } = useToast()

  const referralLink = `https://phishguard.app/join?ref=${referralCode}`

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareViaEmail = () => {
    const subject = "Join me on PhishGuard - Cybersecurity Training"
    const body = `I've been using PhishGuard to improve my cybersecurity awareness and thought you'd find it valuable too!\n\nJoin using my referral link: ${referralLink}\n\nYou'll get bonus points to start with, and we'll both earn rewards as you progress.`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const shareViaWhatsApp = () => {
    const message = `🛡️ Join me on PhishGuard for cybersecurity training!\n\nGet bonus points with my referral link: ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`)
  }

  const getTierColor = () => {
    switch (tier) {
      case "Bronze":
        return "text-orange-600"
      case "Silver":
        return "text-gray-500"
      case "Gold":
        return "text-yellow-500"
      case "Platinum":
        return "text-purple-500"
    }
  }

  const getNextTierRequirement = () => {
    switch (tier) {
      case "Bronze":
        return "5 referrals for Silver"
      case "Silver":
        return "15 referrals for Gold"
      case "Gold":
        return "30 referrals for Platinum"
      case "Platinum":
        return "Maximum tier reached!"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Referral Program
          </span>
          <Badge className={getTierColor()}>{tier} Tier</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{referralsCount}</div>
            <div className="text-xs text-muted-foreground">Referrals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">{pointsEarned}</div>
            <div className="text-xs text-muted-foreground">Points Earned</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-500">{tier}</div>
            <div className="text-xs text-muted-foreground">Current Tier</div>
          </div>
        </div>

        {/* Next Tier Progress */}
        <div className="text-center text-sm text-muted-foreground">{getNextTierRequirement()}</div>

        {/* Referral Link */}
        <div className="space-y-3">
          <h4 className="font-medium">Your Referral Link</h4>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="font-mono text-sm" />
            <Button size="sm" variant="outline" onClick={() => copyToClipboard(referralLink)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Share Methods */}
        <div className="space-y-3">
          <h4 className="font-medium">Share with Friends</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(referralLink)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" onClick={shareViaEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm" onClick={shareViaWhatsApp}>
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start gap-2">
            <Gift className="h-4 w-4 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Earn Rewards</p>
              <p className="text-muted-foreground">
                Get 50 points for each friend who joins and completes their first simulation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
