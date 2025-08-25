import { Scenario } from '@/types'
import { MessageSquare, ExternalLink } from 'lucide-react'

interface SmsViewProps {
  scenario: Scenario
}

export default function SmsView({ scenario }: SmsViewProps) {
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
      {/* SMS Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-5 w-5 text-slate-400" />
          <span className="text-slate-300 font-medium">SMS Message</span>
        </div>
      </div>

      {/* SMS Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg rounded-bl-none max-w-sm ml-auto">
            <p className="text-sm leading-relaxed">{scenario.smsText}</p>
            <div className="text-xs opacity-75 mt-2">Just now</div>
          </div>

          {scenario.linkUrl && (
            <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
                <ExternalLink className="h-4 w-4" />
                <span>Link Preview:</span>
              </div>
              <div className="text-slate-300 font-mono text-sm break-all">
                {scenario.linkUrl}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}