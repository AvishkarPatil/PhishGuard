import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: 'user' | 'admin'
  department: string
  joinedAt: Date
  scoreTotal: number
  riskLevel: 'Low' | 'Medium' | 'High'
  completedScenarios: string[]
  badges: string[]
}

export const signIn = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  
  const userProfile: UserProfile = {
    uid: result.user.uid,
    email: result.user.email!,
    displayName: userData.displayName || '',
    role: 'user',
    department: userData.department || '',
    joinedAt: new Date(),
    scoreTotal: 0,
    riskLevel: 'Medium',
    completedScenarios: [],
    badges: []
  }
  
  await setDoc(doc(db, 'users', result.user.uid), userProfile)
  return result.user
}

export const logout = () => signOut(auth)

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() as UserProfile : null
}