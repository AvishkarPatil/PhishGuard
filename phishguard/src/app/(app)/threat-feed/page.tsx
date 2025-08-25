import { AlertTriangle, Clock, Tag } from 'lucide-react'
import threatFeedData from '@/data/threat-feed.json'

interface ThreatItem {
  id: string
  title: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  timestamp: string
  description: string
  category: string
}

export default function ThreatFeed() {
  const threats = threatFeedData as ThreatItem[]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'High':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Low':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-50">Threat Intelligence Feed</h1>
        <p className="text-slate-400 mt-2">Real-time cybersecurity threats and attack patterns</p>
      </div>

      <div className="space-y-4">
        {threats.map((threat) => (
          <div key={threat.id} className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-medium text-slate-50">{threat.title}</h2>
              </div>
              
              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getSeverityColor(threat.severity)}`}>
                {threat.severity}
              </span>
            </div>

            <p className="text-slate-300 mb-4 leading-relaxed">{threat.description}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Tag className="h-4 w-4" />
                  <span>{threat.category}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimestamp(threat.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 border-dashed">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-slate-50 mb-2">Live Intelligence Integration</h3>
          <p className="text-slate-400 text-sm">
            Our platform integrates with live threat intelligence feeds to automatically generate 
            new training scenarios based on emerging attack patterns and real-world threats.
          </p>
        </div>
      </div>
    </div>
  )
}