import { Scenario } from '@/types'
import SimulationPlayer from '@/components/simulation/SimulationPlayer'
import scenariosData from '@/data/scenarios.json'

interface PageProps {
  params: { id: string }
}

export default async function SimulatePage({ params }: PageProps) {
  const scenario = scenariosData.find(s => s.id === params.id) as Scenario
  
  if (!scenario) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-50">Scenario Not Found</h1>
        <p className="text-slate-400 mt-2">The requested scenario could not be found.</p>
      </div>
    )
  }

  return <SimulationPlayer scenario={scenario} />
}