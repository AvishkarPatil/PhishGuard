"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Bell, X, Shield, Trophy, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockNotifications = [
  {
    id: 1,
    type: "threat",
    title: "New UPI Scam Alert",
    message: "Fake QR codes detected in Mumbai area",
    time: "2 min ago",
    unread: true
  },
  {
    id: 2,
    type: "achievement",
    title: "Badge Earned!",
    message: "You've earned the 'Phish Hunter' badge",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    type: "training",
    title: "Training Reminder",
    message: "Complete your weekly security training",
    time: "3 hours ago",
    unread: false
  }
]

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  
  const unreadCount = notifications.filter(n => n.unread).length

  const getIcon = (type: string) => {
    switch (type) {
      case "threat": return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "achievement": return <Trophy className="h-4 w-4 text-yellow-500" />
      case "training": return <Shield className="h-4 w-4 text-blue-500" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, unread: false} : n))
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && typeof window !== 'undefined' && createPortal(
        <Card className="fixed top-20 left-32 w-80 shadow-xl z-[9999]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-muted/50 cursor-pointer border-l-2 ${
                    notification.unread ? 'border-l-primary bg-primary/5' : 'border-l-transparent'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>,
        document.body
      )}
    </div>
  )
}