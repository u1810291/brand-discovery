/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { query, getDocs, collection, where, DocumentData, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { useDispatch } from 'src/store'
import { setSettings, SettingsType as StoreSettingsType } from 'src/store/slices/settings'

type SettingsType = {
  categories: Array<Record<string, string | number>>
  distance: number
  filterByDistance: boolean
  location: Record<string, any>
  uid: string
}

export const useUpdateSettings = () => {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()
  const [search, setSearch] = useState<string>('')
  const [countries, setCountries] = useState<any[]>()
  const dispatch = useDispatch()

  const fetchSettings = useCallback(async (uid) => {
    try {
      setLoading(true)
      if (uid) {
        const q = await getDoc(doc(collection(db(), 'settings'), uid))
        setSuccess(q.data())
        dispatch(setSettings({
          createdAt: q.data()?.createdAt,
          location: q.data()?.location,
          uid: q.data()?.uid,
          filterByDistance: q.data()?.filterByDistance,
          categories: q.data()?.categories,
          updatedAt: q.data()?.updatedAt,
          distance: q.data()?.distance,
        }))
        setLoading(false)
      } else {
        setError('There is no settings for such user')
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let timer = null
    if (search) {
      setLoading(true)
      timer = setTimeout(async () => {
        const res = await getLocations(search)
        setCountries(res)
        setLoading(false)
      }, 500)
    }
    return () => clearTimeout(timer)
  }, [search])

  const updateSettings = useCallback(async (data: SettingsType) => {
    try {
      const uid = data.uid
      setLoading(true)
      const q = query(collection(db(), 'settings'), where('uid', '==', uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0 && uid) {
        await setDoc(doc(collection(db(), 'settings'), uid), {
          uid,
          createdAt: new Date(),
          updatedAt: new Date(),
          categories: data.categories,
          distance: data.distance,
          location: data.location,
          filterByDistance: data.filterByDistance,
        })
      } else {
        const now = new Date()
        console.error(data)
        const updatedData = {
          uid,
          updatedAt: now,
          distance: data.distance,
          ...(data.location && { location: data.location }),
          ...(data.categories && { categories: data.categories }),
          ...(data.filterByDistance && { filterByDistance: data.filterByDistance }),
        }
        await updateDoc(docs.docs[0].ref, updatedData)
      }
      setLoading(false)
      setSuccess('Successfully updated!')
    } catch (err) {
      console.error(err)
      setError(err.message || err)
      setLoading(false)
    }
  }, [])
  return { updateSettings, fetchSettings, search, setSearch, countries, loading, success, error }
}

export const useOneLocation = (uid) => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState()
  const [loading, setLoading] = useState<boolean>()
  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true)
      if (uid) {
        const q = await getDoc(doc(collection(db(), 'settings'), uid))
        setData(q.data())
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }, [])
  return { fetchLocation, data, loading, error } as const
}

export async function getLocations(query) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GET_COUNTRIES_AND_CITY_ENDPOINT}/?format=json&addressdetails=1&q=${query}&format=json&limit=15`,
  )
  const data = res.json()
  return data
}
