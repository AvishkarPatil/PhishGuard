import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

// User operations
export const getUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
}

export const updateUser = async (uid: string, data: any) => {
  const docRef = doc(db, 'users', uid)
  await updateDoc(docRef, data)
}

// Scenarios operations
export const getScenarios = async () => {
  const querySnapshot = await getDocs(collection(db, 'scenarios'))
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getScenario = async (id: string) => {
  const docRef = doc(db, 'scenarios', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
}

// Leaderboard operations
export const getLeaderboard = async () => {
  const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(50))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const updateLeaderboard = async (userId: string, data: any) => {
  const docRef = doc(db, 'leaderboard', userId)
  await setDoc(docRef, data, { merge: true })
}

// Threat feed operations
export const getThreats = async () => {
  const q = query(collection(db, 'threats'), orderBy('timestamp', 'desc'), limit(20))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Attempt tracking
export const saveAttempt = async (attemptData: any) => {
  const docRef = doc(collection(db, 'attempts'))
  await setDoc(docRef, {
    ...attemptData,
    timestamp: Timestamp.now()
  })
  return docRef.id
}

export const getUserAttempts = async (userId: string) => {
  const q = query(
    collection(db, 'attempts'), 
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(10)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Real-time subscriptions
export const subscribeToUser = (uid: string, callback: (data: any) => void) => {
  const docRef = doc(db, 'users', uid)
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() })
    }
  })
}

export const subscribeToLeaderboard = (callback: (data: any[]) => void) => {
  const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(50))
  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    callback(data)
  })
}