import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'user' | 'admin';
  scoreTotal: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  completedScenarioIds: string[];
  badges: string[];
  createdAt: Timestamp;
  lastActive: Timestamp;
}

export interface Scenario {
  id: string;
  type: 'email' | 'sms';
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  points: number;
  fromName?: string;
  fromAddress?: string;
  subject?: string;
  bodyHtml?: string;
  linkUrl?: string;
  smsText?: string;
  phishSignalHints: string[];
  answerKey: {
    isPhish: boolean;
    redFlags: string[];
  };
}

export interface Attempt {
  id: string;
  userId: string;
  scenarioId: string;
  action: 'reported' | 'clicked' | 'ignored';
  timeToDecisionMs: number;
  result: 'safe' | 'unsafe';
  pointsAwarded: number;
  createdAt: Timestamp;
}