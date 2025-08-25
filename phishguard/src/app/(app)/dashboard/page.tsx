'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { UserProfile, Scenario } from '@/types'
import { Shield, Target, Trophy, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [nextScenario, setNextScenario] = useState<Scenario | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock user profile
        const mockProfile: UserProfile = {
          uid: 'demo-user',
          email: 'demo@phishguard.com',
          role: 'user',
          scoreTotal: 250,
          riskLevel: 'Medium',
          completedScenarioIds: [],
          badges: ['First Steps'],
          createdAt: { seconds: Date.now() / 1000 } as any,
          lastActive: { seconds: Date.now() / 1000 } as any,
        }
        setUserProfile(mockProfile)

        // Find next uncompleted scenario from local data
        const scenariosData = await import('@/data/scenarios.json')
        const scenarios = scenariosData.default as Scenario[]
        const uncompletedScenario = scenarios.find(s => !mockProfile.completedScenarioIds.includes(s.id))
        
        if (uncompletedScenario) {
          setNextScenario(uncompletedScenario)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const startTraining = () => {
    if (nextScenario) {
      router.push(`/simulate/${nextScenario.id}`)
    }
  }

  if (loading) {
    return <div className="text-slate-50">Loading dashboard...</div>
  }

  if (!userProfile) {
    return <div className="text-slate-50">Error loading profile</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-50">Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome back to your security training</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Score</p>
              <p className="text-2xl font-bold text-slate-50">{userProfile.scoreTotal}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Risk Level</p>
              <p className="text-2xl font-bold text-slate-50">{userProfile.riskLevel}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-slate-50">{userProfile.completedScenarioIds.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Badges</p>
              <p className="text-2xl font-bold text-slate-50">{userProfile.badges.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Section */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h2 className="text-xl font-bold text-slate-50 mb-4">Continue Training</h2>
        {nextScenario ? (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-50">{nextScenario.title}</h3>
              <p className="text-slate-400 text-sm">
                {nextScenario.type.toUpperCase()} • Difficulty {nextScenario.difficulty}/5 • {nextScenario.points} points
              </p>
            </div>
            <button
              onClick={startTraining}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Start Training
            </button>
          </div>
        ) : (
          <p className="text-slate-400">All scenarios completed! Great job!</p>
        )}
      </div>

      {/* Badges Section */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h2 className="text-xl font-bold text-slate-50 mb-4">Badges</h2>
        {userProfile.badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {userProfile.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No badges earned yet. Complete training scenarios to earn badges!</p>
        )}
      </div>
    </div>
  )
}