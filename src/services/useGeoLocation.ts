/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { query, getDocs, collection, where, addDoc, getDocFromServer, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

type GeoType = {
  uid: string
  name: string
  latitude: number
  longitude: number
}

export const useStoreGeoLocation = () => {
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

  const setUserGeoPosition = useCallback(async (geo: GeoType) => {
    try {
      setLoading(true)
      const q = query(collection(db(), 'settings'), where('uid', '==', geo.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0 && geo.uid) {
        await setDoc(doc(collection(db(), 'settings'), geo.uid), {
          uid: geo.uid,
          latitude: geo.latitude,
          longitude: geo.longitude,
          name: geo.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
      setLoading(false)
      setSuccess('Successfully added!')
    } catch (err) {
      console.error(err)
      setError(err)
      setLoading(false)
    }
  }, [])
  return [setUserGeoPosition, search, setSearch, countries, loading, success, error]
}

export const useOneLocation = (uid) => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState();
  const fetchLocation = useCallback(async () => {
    try {
      if (uid) {
        const q = await getDoc(doc(collection(db(), 'settings'), uid))
        setData(q.data())
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }, [])
  return [fetchLocation, data, error] as const
}

export async function getLocations(query) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GET_COUNTRIES_AND_CITY_ENDPOINT}/?format=json&addressdetails=1&q=${query}&format=json&limit=15`,
  )
  const data = res.json()
  return data
}
