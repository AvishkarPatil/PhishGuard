import { ResultsDisplay } from "@/components/results/results-display"

interface ResultsPageProps {
  params: Promise<{
    attemptId: string
  }>
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  // In a real app, this would fetch from Firebase
  // For demo, we'll get from localStorage on the client side
  const { attemptId } = await params
  return <ResultsDisplay attemptId={attemptId} />
}
