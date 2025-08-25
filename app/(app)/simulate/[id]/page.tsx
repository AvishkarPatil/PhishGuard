import { notFound } from "next/navigation"
import { SimulationPlayer } from "@/components/simulation/simulation-player"
import { mockScenarios } from "@/data/scenarios"

interface SimulatePageProps {
  params: {
    id: string
  }
}

export default async function SimulatePage({ params }: SimulatePageProps) {
  const { id } = await params
  const scenario = mockScenarios.find((s) => s.id === id)

  if (!scenario) {
    notFound()
  }

  return <SimulationPlayer scenario={scenario} />
}
