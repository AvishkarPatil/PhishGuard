"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye, Search, Mail, Smartphone } from "lucide-react"
import { mockScenarios } from "@/data/scenarios"
import type { Scenario } from "@/types"

export function ScenarioManager() {
  const [scenarios, setScenarios] = useState<Scenario[]>(mockScenarios)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredScenarios = scenarios.filter(
    (scenario) =>
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setScenarios(scenarios.filter((s) => s.id !== id))
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-green-500"
    if (difficulty <= 3) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Management</CardTitle>
        <CardDescription>Manage existing phishing scenarios and their configurations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scenarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {/* Scenarios Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScenarios.map((scenario) => (
                <TableRow key={scenario.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {scenario.type === "email" ? (
                        <Mail className="h-4 w-4 text-primary" />
                      ) : (
                        <Smartphone className="h-4 w-4 text-primary" />
                      )}
                      <Badge variant="secondary">{scenario.type.toUpperCase()}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{scenario.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {scenario.type === "email" ? scenario.subject : scenario.smsText?.slice(0, 50) + "..."}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getDifficultyColor(scenario.difficulty)}`} />
                      <span>{scenario.difficulty}/5</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{scenario.points}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={scenario.answerKey.isPhish ? "destructive" : "default"}>
                      {scenario.answerKey.isPhish ? "Phishing" : "Legitimate"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(scenario.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No scenarios found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
