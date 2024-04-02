import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyD8is_glhLHHCJ8L4ZWsNQ-ZwiqnDVcSFU',
   authDomain: 'bilinguo-c5ad7.firebaseapp.com',
   projectId: 'bilinguo-c5ad7',
   storageBucket: 'bilinguo-c5ad7.appspot.com',
   messagingSenderId: '920208050630',
   appId: '1:920208050630:web:7d49dd646dbbe0c25e0ac7',
}

const app = initializeApp(firebaseConfig, 'bilinguo')

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }
