import { notFound } from "next/navigation"
import { allEnhancedScenarios } from "@/data/enhanced-scenarios"
import { EnhancedSimulationPlayer } from "@/components/simulation/enhanced-simulation-player"
import { SimulationSkeleton } from "@/components/loading/simulation-skeleton"
import { Suspense } from "react"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EnhancedSimulatePage({ params }: PageProps) {
  const { id } = await params
  const scenario = allEnhancedScenarios.find((s) => s.id === id)

  if (!scenario) {
    notFound()
  }

  return (
    <Suspense fallback={<SimulationSkeleton />}>
      <EnhancedSimulationPlayer scenario={scenario} />
    </Suspense>
  )
}
