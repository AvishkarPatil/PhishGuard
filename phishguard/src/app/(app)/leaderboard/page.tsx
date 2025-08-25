'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { UserProfile } from '@/types'
import { Trophy, Medal, Award } from 'lucide-react'

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          orderBy('scoreTotal', 'desc'),
          limit(10)
        )
        
        const querySnapshot = await getDocs(q)
        const users = querySnapshot.docs.map(doc => doc.data() as UserProfile)
        setTopUsers(users)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />
      default:
        return <span className="text-slate-400 font-bold text-lg">{rank}</span>
    }
  }

  if (loading) {
    return <div className="text-slate-50">Loading leaderboard...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-50">Leaderboard</h1>
        <p className="text-slate-400 mt-2">Top performers in phishing awareness training</p>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Score</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Risk Level</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Completed</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {topUsers.map((user, index) => (
                <tr key={user.uid} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(index + 1)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-50 font-medium">
                      {user.displayName || user.email.split('@')[0]}
                    </div>
                    <div className="text-slate-400 text-sm">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-50 font-bold text-lg">{user.scoreTotal}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.riskLevel === 'Low' 
                        ? 'bg-green-500/20 text-green-300'
                        : user.riskLevel === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {user.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-50">{user.completedScenarioIds.length}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.badges.slice(0, 3).map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                      {user.badges.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full">
                          +{user.badges.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {topUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No users found. Be the first to complete training!</p>
        </div>
      )}
    </div>
  )
}