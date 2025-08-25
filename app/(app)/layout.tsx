"use client"

import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { SecurityChatbot } from "@/components/chat/security-chatbot"
import { ToastProvider } from "@/components/ui/toast"
import { AuthProvider } from "@/lib/AuthContext"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <div className="ml-64 flex flex-col min-h-screen">
            <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out">{children}</main>
          </div>
          <SecurityChatbot />
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}
