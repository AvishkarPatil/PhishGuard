"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Shield, LayoutDashboard, Play, Trophy, Settings, Rss, LogOut, User, ClipboardCheck, Moon, Sun, Languages, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationBell } from "@/components/notification-bell"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/AuthContext"
import { logout } from "@/lib/auth"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Training", href: "/training", icon: Play },
  { name: "Skill Assessment", href: "/skill-assessment", icon: ClipboardCheck },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Threat Feed", href: "/threat-feed", icon: Rss },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Admin", href: "/admin", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [currentLang, setCurrentLang] = useState('English')
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const { user, userProfile } = useAuth()
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' }
  ]

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = theme === 'dark' || (!theme && systemDark)
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const selectLanguage = (lang: string) => {
    setCurrentLang(lang)
    setShowLangDropdown(false)
    localStorage.setItem('language', lang)
  }

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col shadow-lg h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-sidebar-border bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div>
              <h1 className="text-lg font-black text-sidebar-foreground tracking-tight">PhishGuard</h1>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Security Training</p>
            </div>
          </div>
          <NotificationBell />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-colors", isActive && "text-primary")} />
              {item.name}
              {isActive && <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>}
            </Link>
          )
        })}
        
        {/* Language Selector */}
        <div className="relative mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent px-4 py-3"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
          >
            <div className="flex items-center gap-3">
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium">{currentLang}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showLangDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                  onClick={() => selectLanguage(lang.name)}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-4 mt-auto">
        <div className="px-2 space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-medium text-sidebar-foreground">{userProfile?.displayName || user?.email || 'User'}</div>
            <div className="text-xs text-sidebar-foreground/60">{user?.email || 'user@example.com'}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xs text-orange-500">🔥 7 day streak</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={async () => {
                await logout()
                window.location.href = "/"
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-2 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
