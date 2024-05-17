import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore/lite'
import { type Van, type LoginFormData } from './types'

const firebaseConfig = {
    apiKey: 'AIzaSyAQZio-P8SG45V2nNQOvO9bhLGdWg62-1M',
    authDomain: 'vanlife-f5ec6.firebaseapp.com',
    projectId: 'vanlife-f5ec6',
    storageBucket: 'vanlife-f5ec6.appspot.com',
    messagingSenderId: '579193734532',
    appId: '1:579193734532:web:6026ff46b28b9ffc5e09d1',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching function below
const vansCollectionRef = collection(db, 'vans')

export async function getVans(): Promise<Van[]> {
    const snapshot = await getDocs(vansCollectionRef)
    const vans: Van[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: doc.data().type,
        name: doc.data().name,
        imageUrl: doc.data().imageUrl,
        price: doc.data().price,
        hostId: doc.data().hostId,
        description: doc.data().description,
    }))

    return vans
}

export async function getVan(id: string): Promise<Van> {
    const docRef = doc(db, 'vans', id)
    const snapshot = await getDoc(docRef)

    return {
        id: snapshot.id,
        type: snapshot?.data()?.type,
        name: snapshot?.data()?.name,
        imageUrl: snapshot?.data()?.imageUrl,
        price: snapshot?.data()?.price,
        hostId: snapshot?.data()?.hostId,
        description: snapshot?.data()?.description,
    }
}

export async function getHostVans(): Promise<Van[]> {
    const q = query(vansCollectionRef, where('hostId', '==', '123'))
    const snapshot = await getDocs(q)
    const vans: Van[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        type: doc.data().type,
        name: doc.data().name,
        imageUrl: doc.data().imageUrl,
        price: doc.data().price,
        hostId: doc.data().hostId,
        description: doc.data().description,
    }))
    return vans
}

export async function loginUser(creds: LoginFormData) {
    const res = await fetch('/api/login', {
        method: 'post',
        body: JSON.stringify(creds),
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        }
    }

    return data
}

// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
// function sleep(ms: number) {
//     return new Promise((resolve) => setTimeout(() => resolve(), ms))
// }
