/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
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
        await docs.forEach((doc) => {
          temp.push(doc.data())
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
