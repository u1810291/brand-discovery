import { useCallback, useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { getDoc, query, doc } from 'firebase/firestore'
import { db } from './firebase'

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

  return [fetch, categories, loading, error]
}

export const useSetCategory = () => {
  const setCategory = useCallback(async (category) => {
    if (!!localStorage.getItem('categories')) {
      const settings = JSON.parse(localStorage.getItem('categories'))
      const updatedSettings = [category, ...settings.filter((el) => el.id !== category.id)]
      localStorage.setItem('categories', JSON.stringify(updatedSettings))
    } else {
      localStorage.setItem('categories', JSON.stringify([category]))
    }
  }, [])
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
