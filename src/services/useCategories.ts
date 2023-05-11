import { useCallback, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { useDispatch } from 'src/store'
import { setSettings } from 'src/store/slices/settings'

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
  const dispatch = useDispatch()
  const setCategory = useCallback(async (category) => {
    if (!!localStorage.getItem('categories')) {
      const settings = JSON.parse(localStorage.getItem('categories'))
      const updatedSettings = [category, ...settings.filter((el) => el.id !== category.id)]
      localStorage.setItem('categories', JSON.stringify(updatedSettings))
      dispatch(
        setSettings({
          categories: updatedSettings,
        }),
      )
    } else {
      localStorage.setItem('categories', JSON.stringify([category]))
      dispatch(
        setSettings({
          categories: [category],
        }),
      )
    }
  }, [])
  return [setCategory] as const
}
