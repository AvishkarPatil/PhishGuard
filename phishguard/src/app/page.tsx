'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-50">PhishGuard</h1>
            <p className="text-slate-400 mt-2">Professional Phishing Awareness Training</p>
          </div>

          <button
            onClick={goToDashboard}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}