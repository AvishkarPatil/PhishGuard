import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCKHkPWSPbJzokNYQ6Ty03bf9nlQE4J4R4",
  authDomain: "phishguard-1b5ae.firebaseapp.com",
  projectId: "phishguard-1b5ae",
  storageBucket: "phishguard-1b5ae.firebasestorage.app",
  messagingSenderId: "48548715213",
  appId: "1:48548715213:web:7d09617e18ae82b6796784",
  measurementId: "G-YXFQSNL1JS"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app