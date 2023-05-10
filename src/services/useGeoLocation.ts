/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { query, getDocs, collection, where, addDoc, getDocFromServer, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

type SettingsType = {
  uid: string
  categories: Array<Record<string, string | number>>
  distance: number
  filterByDistance: boolean
  location: Record<string, any>
}

export const useUpdateSettings = () => {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()
  const [search, setSearch] = useState<string>('')
  const [countries, setCountries] = useState<[]>()

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

  const setUserSettings = useCallback(async (data: SettingsType) => {
    try {
      setLoading(true)
      console.error(data)
      const q = query(collection(db(), 'settings'), where('uid', '==', data.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0 && data.uid) {
        await setDoc(doc(collection(db(), 'settings'), data.uid), {
          uid: data.uid,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          name: data.location.name,
          createdAt: new Date(),
          updatedAt: new Date(),
          categories: data.categories,
          distance: data.distance,
          location: data.location,
          filterByDistance: data.filterByDistance,
          placeId: data.location.placeId,
        })
      } else {
        const now = new Date()
        const updatedData = {
          uid: data.uid,
          updatedAt: now,
          ...(data.location && {
            placeId: data.location.placeId,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            name: data.location.name
          }),
          ...(data.categories && { categories: data.categories }),
          ...(data.distance && { distance: data.distance }),
          ...(data.filterByDistance && { filterByDistance: data.filterByDistance }),
        }
        await updateDoc(docs.docs[0].ref, updatedData)
      }
      setLoading(false)
      setSuccess('Successfully updated!')
    } catch (err) {
      console.error(err)
      setError(err)
      setLoading(false)
    }
  }, [])
  return [setUserSettings, search, setSearch, countries, loading, success, error]
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
  return [fetchLocation, data, loading, error] as const
}

export async function getLocations(query) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GET_COUNTRIES_AND_CITY_ENDPOINT}/?format=json&addressdetails=1&q=${query}&format=json&limit=15`,
  )
  const data = res.json()
  return data
}
