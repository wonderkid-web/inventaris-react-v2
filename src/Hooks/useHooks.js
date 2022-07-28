import {useEffect, useState, createContext } from 'react'
import {db} from '../Config/firebaseConfig'
import { getDocs, collection, onSnapshot } from 'firebase/firestore'

export const useFetch = (coll) =>{
	const [data, setData] = useState([])
	const colRef = collection(db, coll)
	useEffect(()=>{
		onSnapshot(colRef, res=>{
			setData(res.docs.map(doc=>(
				{...doc.data(), id: doc.id}
			)))
		})
	}, [])

	return { data }
}

export const LoginContext = createContext({})

export const RolesContext = createContext({})

export const DeleteContext = createContext({})