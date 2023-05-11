import { useCallback, useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { getDoc, query, doc, runTransaction, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import { UserData } from 'src/store/slices/auth/auth.slice'

export const useGetCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const docRef = doc(collection(db(), 'categories'), 'main_category')
        const docSnap = await getDoc(docRef)
        let categoriesData = []
        if (docSnap.exists()) {
          const data = docSnap.data()
          categoriesData = data.categories || []
        }
        setCategories(categoriesData)
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }

    fetchCategories()

    return () => {} // returning an empty function since we don't need any cleanup
  }, [])

  return [categories, loading, error]
}

export const useSetCategory = () => {
  // Get categories from Firestore

  const setCategory = async (uid, category) => {
    try {
      const q = query(collection(db(), 'users'), where('uid', '==', uid))
      const docs = await getDocs(q)
      const userRef = docs.docs[0].ref

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${uid}`)
      }
      const userData = docs.docs[0].data() as UserData

      const updateData = {
        categories: [],
      }
      if (!userData.categories.includes(category)) {
        updateData.categories = [...userData.categories, category]
        await updateDoc(userRef, updateData)
      }
    } catch (err) {
      alert(err)
    }
  }
  return [setCategory] as const
}

// TODO: Create or update
// try {
//   setLoading(true)
//   const q = query(collection(db(), 'settings'), where('uid', '==', category.uid))
//   const docs = await getDocs(q)
//   if (docs.docs.length !== 0 && category.uid) {
//     const docRef = doc(collection(db(), 'settings'), category.uid)
//     await updateDoc(docRef, category)
//   } else {
//     const docRef = doc(collection(db(), 'settings'), category.uid)
//     await setDoc(docRef, category)
//   }
//   setSuccess('Successfully updated!')
// } catch (err) {
//   console.error(err)
//   setError(err)
//   setLoading(false)
// } finally {
//   setLoading(false)
// }
