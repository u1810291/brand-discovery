import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { getDoc, query, doc, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { useAppDispatch } from 'src/store'
import { SettingsType, setSettings } from 'src/store/slices/settings'

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Array<string>>([])
  const [selected, setSelected] = useState<Array<string>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const dispatch = useAppDispatch()

  const getSelectedCategories = useCallback(async (user: UserData) => {
    try {
      const q = query(collection(db(), 'settings'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      const userRef = docs.docs[0].ref

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const userData = docs.docs[0].data() as SettingsType

      if (!userData.hasOwnProperty('categories')) {
        await updateDoc(userRef, { categories: [] })
        setError('Created empty categories field in user document')
      }
      dispatch(setSettings({ categories: userData?.categories?.sort() || [] }))
      setSelected(userData?.categories?.sort() || [])
    } catch (err) {
      console.error(err)
      setError(err?.message)
    }
  }, [])

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
        setCategories(categoriesData.sort())
      } catch (error) {
        setError(error?.message)
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  const setCategory = useCallback(async (uid, category, callback) => {
    try {
      const q = query(collection(db(), 'settings'), where('uid', '==', uid))
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
        callback()
      }
    } catch (err) {
      console.error(err)
      setError(err?.message)
    }
  }, [])

  const deleteCategory = useCallback(async (user: UserData, deleted: string) => {
    try {
      const q = query(collection(db(), 'settings'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      const userRef = docs.docs[0].ref

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const userData = docs.docs[0].data() as SettingsType

      const filteredCategories = userData?.categories.filter((category) => category !== deleted)
      await updateDoc(userRef, { categories: filteredCategories })
      dispatch(setSettings({ categories: filteredCategories }))
      getSelectedCategories(user)
    } catch (error) {
      console.error(error)
      setError(error?.message)
      console.error(error)
    }
  }, [])
  return { getSelectedCategories, categories, loading, error, selected, setCategory, deleteCategory }
}
