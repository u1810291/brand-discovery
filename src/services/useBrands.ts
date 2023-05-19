/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react'
import { collection, getDocs, limit, query, where, startAfter, orderBy, endBefore } from 'firebase/firestore'
import { db } from './firebase'
import { useAppDispatch } from 'src/store'
import { setAllBrands } from 'src/store/slices/brands'
import { SettingsType } from 'src/store/slices/settings'
import { UserData } from 'src/store/slices/auth/auth.slice'

export const useBrands = () => {
  const [brands, setBrands] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const dispatch = useAppDispatch()

  function calculateBoundingBox(centerLat, centerLon, size) {
    const radius = 6371

    const miles = size * 1.609344
    const latRad = centerLat * (Math.PI / 180)
    const lonRad = centerLon * (Math.PI / 180)

    const north = miles / 2
    const south = -1 * north
    const east = miles / (2 * Math.cos(latRad))
    const west = -1 * east

    const nwLat = (latRad + north / radius) * (180 / Math.PI)
    const nwLon = (lonRad + west / radius) * (180 / Math.PI)
    const seLat = (latRad + south / radius) * (180 / Math.PI)
    const seLon = (lonRad + east / radius) * (180 / Math.PI)

    return [nwLat, nwLon, seLat, seLon]
  }

  const fetchAllBrands = useCallback(async (user: UserData) => {
    setLoading(true)
    try {
      const settingsRef = collection(db(), 'settings')
      const settingsQuery = query(settingsRef, where('uid', '==', user.uid))
      const settingsDocs = await getDocs(settingsQuery)

      if (settingsDocs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }

      const userRef = collection(db(), 'users')
      const userQuery = query(userRef, where('uid', '==', user.uid))
      const userDocs = await getDocs(userQuery)

      if (userDocs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const settingsData = settingsDocs.docs[0].data() as SettingsType
      const [northLat, northLon, southLat, southLon] = calculateBoundingBox(
        settingsData.location.latitude,
        settingsData.location.longitude,
        settingsData.distance,
      )
      const userData = userDocs.docs[0].data() as UserData
      const companiesQuery = await query(
        collection(db(), 'brands'),
        orderBy('_id'),
        where(
          '_id',
          'not-in',
          userData.likes.map((el) => el.company_id),
        ),
        orderBy('main_categories'),
        ...settingsData.categories.map((el) => endBefore(el)),
        limit(25),
      )

      const companiesData = await getDocs(companiesQuery)
      const brand = []
      companiesData.forEach(async (doc) => {
        const username = doc.data()?.instagram_url?.split('/')
        brand.push({
          company: {
            title: username[username.length - 1],
            location: doc.data()?.city || doc.data()?.loc_label || doc.data()?.loc_locality,
            image:
              doc.data()?.profile_image_url ||
              'https://firebasestorage.googleapis.com/v0/b/brand-discovery-2a140.appspot.com/o/images%2Fadidas%2F2022-08-29_17-29-57_UTC_profile_pic.jpg?alt=media&token=c769ae9f-27d7-4b03-a937-229c5d73fac7',
            followers: doc.data()?.combined_followers,
            tags: [doc.data()?.categories?.split('/')?.filter(Boolean), doc.data()?.main_categories].flatMap(
              (el) => el,
            ),
            id: doc.data()._id,
          },
          images: [],
        })
        // }
      })
      setBrands(brand)
      dispatch(setAllBrands(brand))
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error?.message)
      setLoading(false)
    }
  }, [])

  const fetchOneBrand = useCallback(async (id) => {
    setLoading(true)
    try {
      const companiesQuery = await query(collection(db(), 'companies'), where('_id', '==', id))
      const companiesData = await getDocs(companiesQuery)
      const companiesDoc = companiesData.docs[0].data()
      setBrands({
        company: {
          title: companiesDoc.data()?.profile_name,
          location: 'San Francisco',
          image: companiesDoc.data()?.profile_image_url,
          followers: companiesDoc.data()?.combined_followers,
          tags: [...companiesDoc.data().categories?.split('/').filter(Boolean), companiesDoc.data()?.main_categories],
          id: companiesDoc.data()._id,
        },
        images: [
          companiesDoc.data().picture_1,
          companiesDoc.data().picture_2,
          companiesDoc.data().picture_3,
          companiesDoc.data().picture_4,
          companiesDoc.data().picture_5,
        ],
      })
    } catch (error) {
      setError(error?.message)
    }
    setLoading(false)
  }, [])

  return { brands, loading, error, fetchOneBrand, fetchAllBrands }
}
