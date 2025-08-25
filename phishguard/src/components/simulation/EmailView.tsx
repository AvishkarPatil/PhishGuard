import { Scenario } from '@/types'
import { Mail, ExternalLink } from 'lucide-react'

interface EmailViewProps {
  scenario: Scenario
}

export default function EmailView({ scenario }: EmailViewProps) {
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
      {/* Email Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-slate-400" />
          <span className="text-slate-300 font-medium">Email</span>
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-400">From:</div>
            <div className="text-slate-50">
              {scenario.fromName} &lt;{scenario.fromAddress}&gt;
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-400">Subject:</div>
            <div className="text-slate-50 font-medium">{scenario.subject}</div>
          </div>

          <hr className="border-slate-700" />

          <div className="prose prose-invert max-w-none">
            <div 
              className="text-slate-50 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: scenario.bodyHtml || '' }}
            />
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