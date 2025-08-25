import Link from 'next/link'
import { Attempt, Scenario } from '@/types'
import { CheckCircle, XCircle, Trophy, Clock, Home } from 'lucide-react'

interface ResultsDisplayProps {
  attempt: Attempt
  scenario: Scenario
}

export default function ResultsDisplay({ attempt, scenario }: ResultsDisplayProps) {
  const isSuccess = attempt.result === 'safe'
  const timeInSeconds = Math.round(attempt.timeToDecisionMs / 1000)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isSuccess ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isSuccess ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : (
            <XCircle className="h-8 w-8 text-white" />
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-slate-50">
          {isSuccess ? 'Well Done!' : 'Learning Opportunity'}
        </h1>
        
        <p className="text-slate-400 mt-2">
          {isSuccess 
            ? 'You handled this scenario correctly!' 
            : 'Let\'s review what happened and learn from it.'
          }
        </p>
      </div>

      {/* Results Summary */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-50">{attempt.pointsAwarded}</div>
            <div className="text-sm text-slate-400">Points Earned</div>
          </div>
          
          <div className="text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-50">{timeInSeconds}s</div>
            <div className="text-sm text-slate-400">Decision Time</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
              {attempt.result.toUpperCase()}
            </div>
            <div className="text-sm text-slate-400">Result</div>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h2 className="text-xl font-bold text-slate-50 mb-4">Analysis</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-slate-50 mb-2">Your Action:</h3>
            <p className="text-slate-300">
              You chose to <span className="font-medium">{attempt.action}</span> this {scenario.type}.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-slate-50 mb-2">What You Should Know:</h3>
            <div className="space-y-2">
              {scenario.answerKey.redFlags.map((flag, index) => (
                <div key={index} className="flex items-start space-x-2">
                  {isSuccess ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-slate-300">{flag}</p>
                </div>
              ))}
            </div>
          </div>

          {scenario.phishSignalHints.length > 0 && (
            <div>
              <h3 className="font-medium text-slate-50 mb-2">Red Flags to Watch For:</h3>
              <div className="flex flex-wrap gap-2">
                {scenario.phishSignalHints.map((hint, index) => (
                  <span
                    key={index}
                    className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
                  >
                    {hint}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}