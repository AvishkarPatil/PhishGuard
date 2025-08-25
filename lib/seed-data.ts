import { collection, doc, setDoc, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { allEnhancedScenarios } from '../data/enhanced-scenarios'
import { mockScenarios } from '../data/scenarios'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

// Sample users data
const sampleUsers = [
  {
    uid: 'user1',
    email: 'avi@mail.com',
    displayName: 'Avishkar Patil',
    role: 'user',
    department: 'Development',
    joinedAt: new Date('2025-08-01'),
    scoreTotal: 2420,
    riskLevel: 'Low',
    completedScenarios: ['bank-security-alert-advanced', 'upi-cashback-scam'],
    badges: ['Eagle Eye', 'Phish Hunter']
  },
  {
    uid: 'user2',
    email: 'anuj@tkiet.edu',
    displayName: 'Anuj',
    role: 'user',
    department: 'IT Security',
    joinedAt: new Date('2025-07-15'),
    scoreTotal: 2850,
    riskLevel: 'Low',
    completedScenarios: ['bank-security-alert-advanced', 'upi-cashback-scam', 'job-offer-scam'],
    badges: ['Security Expert', 'Eagle Eye']
  },
  {
    uid: 'user3',
    email: 'vaibhavi@tkiet.edu',
    displayName: 'Vaibhavi',
    role: 'user',
    department: 'Finance',
    joinedAt: new Date('2025-07-20'),
    scoreTotal: 2640,
    riskLevel: 'Low',
    completedScenarios: ['bank-security-alert-advanced', 'lottery-scam-advanced'],
    badges: ['Phish Hunter', 'Security Aware']
  }
]

// Sample threat feed data
const threatFeedData = [
  {
    id: 'threat-001',
    title: 'New UPI QR Code Scam Targeting Indian Users',
    severity: 'High',
    category: 'Mobile Banking',
    description: 'Attackers are using fake UPI QR codes in public places to steal banking credentials.',
    timestamp: new Date(),
    source: 'CERT-In',
    indicators: ['Fake QR codes', 'UPI payment requests', 'Public WiFi exploitation'],
    mitigation: 'Always verify QR codes before scanning, use official banking apps only'
  },
  {
    id: 'threat-002',
    title: 'Phishing Campaign Impersonating Government Tax Portals',
    severity: 'High',
    category: 'Government Impersonation',
    description: 'Sophisticated phishing emails mimicking income tax department communications.',
    timestamp: new Date(Date.now() - 3600000),
    source: 'PhishGuard Intelligence',
    indicators: ['Fake tax refund emails', 'Lookalike domains', 'Urgent payment requests'],
    mitigation: 'Always access tax portals directly, verify sender authenticity'
  }
]

// Leaderboard data
const leaderboardData = [
  { userId: 'user2', rank: 1, score: 2850, weeklyGain: 320, streak: 12, name: 'Anuj', department: 'IT Security' },
  { userId: 'user3', rank: 2, score: 2640, weeklyGain: 280, streak: 8, name: 'Vaibhavi', department: 'Finance' },
  { userId: 'user1', rank: 3, score: 2420, weeklyGain: 240, streak: 15, name: 'Avishkar Patil', department: 'Development' },
  { userId: 'user4', rank: 4, score: 2180, weeklyGain: 180, streak: 5, name: 'Rahul Sharma', department: 'Operations' },
  { userId: 'user5', rank: 5, score: 1950, weeklyGain: 150, streak: 3, name: 'Priya Singh', department: 'HR' },
  { userId: 'user6', rank: 6, score: 1820, weeklyGain: 120, streak: 7, name: 'Amit Kumar', department: 'Marketing' },
  { userId: 'user7', rank: 7, score: 1650, weeklyGain: 90, streak: 2, name: 'Sneha Patel', department: 'Finance' },
  { userId: 'user8', rank: 8, score: 1480, weeklyGain: 75, streak: 4, name: 'Vikram Joshi', department: 'IT Security' },
  { userId: 'user9', rank: 9, score: 1320, weeklyGain: 60, streak: 1, name: 'Kavya Reddy', department: 'Development' },
  { userId: 'user10', rank: 10, score: 1150, weeklyGain: 45, streak: 6, name: 'Arjun Mehta', department: 'Operations' }
]

// Sample notifications
const notificationsData = [
  {
    id: 'notif-001',
    userId: 'user1',
    type: 'achievement',
    title: 'Badge Earned!',
    message: "You've earned the 'Phish Hunter' badge",
    timestamp: new Date(),
    read: false
  },
  {
    id: 'notif-002',
    userId: 'user1',
    type: 'threat',
    title: 'New UPI Scam Alert',
    message: 'Fake QR codes detected in Mumbai area',
    timestamp: new Date(Date.now() - 7200000),
    read: false
  }
]

// Sample user attempts
const attemptsData = [
  {
    id: 'attempt-001',
    userId: 'user1',
    scenarioId: 'bank-security-alert-advanced',
    result: 'safe',
    score: 85,
    timeSpent: 45,
    timestamp: new Date(Date.now() - 86400000)
  },
  {
    id: 'attempt-002',
    userId: 'user2',
    scenarioId: 'upi-cashback-scam',
    result: 'safe',
    score: 95,
    timeSpent: 32,
    timestamp: new Date(Date.now() - 172800000)
  }
]

export async function seedDatabase() {
  console.log('Starting database seeding...')
  
  try {
    // Create Firebase Auth user first
    console.log('Creating Firebase Auth user...')
    try {
      await createUserWithEmailAndPassword(auth, 'avi@mail.com', 'avi123')
      console.log('✅ User created successfully')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('✅ User already exists')
      } else {
        console.log('⚠️ User creation error:', error.message)
      }
    }
    
    const batch = writeBatch(db)
    
    // Seed users
    console.log('Seeding users...')
    for (const user of sampleUsers) {
      const userRef = doc(db, 'users', user.uid)
      batch.set(userRef, user)
    }
    
    // Seed scenarios
    console.log('Seeding scenarios...')
    for (const scenario of [...allEnhancedScenarios, ...mockScenarios]) {
      const scenarioRef = doc(db, 'scenarios', scenario.id)
      batch.set(scenarioRef, scenario)
    }
    
    // Seed threat feed
    console.log('Seeding threat feed...')
    for (const threat of threatFeedData) {
      const threatRef = doc(db, 'threats', threat.id)
      batch.set(threatRef, threat)
    }
    
    // Seed leaderboard
    console.log('Seeding leaderboard...')
    for (const entry of leaderboardData) {
      const leaderboardRef = doc(db, 'leaderboard', entry.userId)
      batch.set(leaderboardRef, entry)
    }
    
    // Seed notifications
    console.log('Seeding notifications...')
    for (const notification of notificationsData) {
      const notifRef = doc(db, 'notifications', notification.id)
      batch.set(notifRef, notification)
    }
    
    // Seed user attempts
    console.log('Seeding user attempts...')
    for (const attempt of attemptsData) {
      const attemptRef = doc(db, 'attempts', attempt.id)
      batch.set(attemptRef, attempt)
    }
    
    await batch.commit()
    console.log('Database seeding completed successfully!')
    console.log('✅ Added: Users, Scenarios, Threats, Leaderboard, Notifications, Attempts')
    
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}