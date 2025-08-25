"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export function TestFirebase() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus('Testing...')
    
    try {
      // Test adding a simple document
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Hello Firebase!',
        timestamp: new Date()
      })
      
      setStatus(`✅ Success! Document ID: ${docRef.id}`)
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`)
      console.error('Firebase error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Firebase Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConnection} disabled={loading} className="w-full">
          {loading ? 'Testing...' : 'Test Firebase Connection'}
        </Button>
        {status && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            {status}
          </div>
        )}
      </CardContent>
    </Card>
  )
}