import { useCallback, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export const useGetCategories = () => {
  const [data, setData] = useState<Array<Record<string, string>>>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()

  const fetchCategories = useCallback(async (uid: string) => {
    try {
      setLoading(true)
      if (uid) {
        const docs = await getDocs(collection(db(), 'categories'))
        const temp = []
        docs.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() })
        })
        setData(temp)
      }
    } catch (err) {
      console.error(err)
      setError(err?.message || '')
    } finally {
      setLoading(false)
    }
  }, [])
  return [fetchCategories, data, loading, error] as const
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
