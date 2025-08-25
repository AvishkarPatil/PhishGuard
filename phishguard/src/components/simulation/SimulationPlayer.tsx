'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { handleSimulationAction } from '@/lib/scoring'
import { Scenario } from '@/types'
import EmailView from './EmailView'
import SmsView from './SmsView'
import { Shield, MousePointer, EyeOff } from 'lucide-react'

interface SimulationPlayerProps {
  scenario: Scenario
}

export default function SimulationPlayer({ scenario }: SimulationPlayerProps) {
  const [startTime] = useState(Date.now())
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAction = async (action: 'reported' | 'clicked' | 'ignored') => {
    if (!auth.currentUser) return

    setLoading(true)
    try {
      const timeToDecision = Date.now() - startTime
      const attemptId = await handleSimulationAction(
        auth.currentUser.uid,
        scenario,
        action,
        timeToDecision
      )
      
      router.push(`/results/${attemptId}`)
    } catch (error) {
      console.error('Error handling action:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-50">{scenario.title}</h1>
        <p className="text-slate-400 mt-2">
          {scenario.type.toUpperCase()} Simulation • Difficulty {scenario.difficulty}/5 • {scenario.points} points
        </p>
      </div>

      {/* Scenario Display */}
      <div className="max-w-4xl">
        {scenario.type === 'email' ? (
          <EmailView scenario={scenario} />
        ) : (
          <SmsView scenario={scenario} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h2 className="text-lg font-medium text-slate-50 mb-4">What would you do?</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleAction('reported')}
            disabled={loading}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            <Shield className="h-5 w-5" />
            <span>Report as Phishing</span>
          </button>

          <button
            onClick={() => handleAction('clicked')}
            disabled={loading}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            <MousePointer className="h-5 w-5" />
            <span>Click Link / Respond</span>
          </button>

          <button
            onClick={() => handleAction('ignored')}
            disabled={loading}
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            <EyeOff className="h-5 w-5" />
            <span>Ignore</span>
          </button>
        </div>
      </div>
    </div>
  )
}