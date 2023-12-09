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

export async function getVans() {
	const snapshot = await getDocs(vansCollectionRef)
	const vans = snapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}))

	return vans
}

export async function getVan(id) {
	const docRef = doc(db, 'vans', id)
	const snapshot = await getDoc(docRef)
	console.log(snapshot.doc)
	return {
		...snapshot.data(),
		id: snapshot.id,
	}
}

export async function getHostVans() {
	const q = query(vansCollectionRef, where('hostId', '==', '123'))
	const snapshot = await getDocs(q)
	const vans = snapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}))
	return vans
}

// export async function getHostVans(id) {
// 	const url = id ? `/api/host/vans/${id}` : '/api/host/vans'
// 	const res = await fetch(url)
// 	if (!res.ok) {
// 		throw {
// 			message: 'Failed to fetch vans',
// 			statusText: res.statusText,
// 			status: res.status,
// 		}
// 	}
// 	const data = await res.json()
// 	return data.vans
// }

export async function loginUser(creds) {
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
function sleep(ms) {
	return new Promise((resolve) => setTimeout(() => resolve(), ms))
}
