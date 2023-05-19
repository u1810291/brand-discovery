/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react'
import { collection, getDocs, limit, query, where, startAfter, orderBy } from 'firebase/firestore'
import { db } from './firebase'
import { useAppDispatch } from 'src/store'
import { setAllBrands } from 'src/store/slices/brands'
import { SettingsType } from 'src/store/slices/settings'
import { UserData } from 'src/store/slices/auth/auth.slice'
import defaultLogo from '../../public/images/default_logo.svg'
import defaultPicture from '../../public/images/default_brand_image.png'

export const useBrands = () => {
  const [brands, setBrands] = useState<any>([])
  const [brand, setBrand] = useState<any>()
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
      const userLimit = (userData.likesLeft || 10) * 3

      // TODO: Fix me, needs to be iteratively fetch not liked data from firestore
      // https://stackoverflow.com/questions/61354866/is-there-a-workaround-for-the-firebase-query-in-limit-to-10
      const companiesQuery = await query(
        collection(db(), 'brands'),
        orderBy('main_categories'),
        ...settingsData.categories.map((el) => startAfter(el)),
        limit(userLimit),
      )

      const companiesData = await getDocs(companiesQuery)
      const brand = []
      companiesData.forEach(async (doc) => {
        if (!userData.likes.map((el) => el.company_id).includes(doc.data()._id)) {
          if (
            doc.data().loc_latitude <= northLat &&
            doc.data().loc_latitude >= southLat &&
            doc.data().loc_longitude >= northLon &&
            doc.data().loc_longitude <= southLon
          ) {
            const username = doc.data()?.instagram_url?.split('/')
            brand.push({
              company: {
                title: username[username.length - 1],
                location: doc.data()?.city || doc.data()?.loc_label || doc.data()?.loc_locality,
                image: doc.data()?.profile_image_url || defaultLogo,
                followers: doc.data()?.combined_followers,
                tags: [doc.data()?.categories?.split('/')?.filter(Boolean), doc.data()?.main_categories].flatMap(
                  (el) => el,
                ),
                id: doc.data()._id,
              },
              images: [defaultPicture],
            })
          }
        }
      })
      console.error(brand)
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
      const companiesQuery = await query(collection(db(), 'brands'), where('_id', '==', id))
      const companiesData = await getDocs(companiesQuery)
      const companiesDoc = companiesData.docs[0].data()
      const username = companiesDoc?.instagram_url?.split('/')

      setBrand({
        company: {
          title: username[username.length - 1],
          location: companiesDoc?.city || companiesDoc?.loc_label || companiesDoc?.loc_locality,
          image: companiesDoc?.profile_image_url || defaultLogo,
          followers: companiesDoc?.combined_followers,
          tags: [companiesDoc?.categories?.split('/')?.filter(Boolean), companiesDoc?.main_categories].flatMap(
            (el) => el,
          ),
          id: companiesDoc?._id,
        },
        images: [defaultPicture],
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error)
      console.error(error)
    }
  }, [])

  const fetchLikedBrands = useCallback(async (user: UserData) => {
    setLoading(true)
    try {
      const userRef = collection(db(), 'users')
      const userQuery = query(userRef, where('uid', '==', user.uid))
      const userDocs = await getDocs(userQuery)

      if (userDocs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }

      const userData = userDocs.docs[0].data() as UserData
      const filterLiked = userData.likes.filter((el) => el.liked === true).map((el) => el.company_id)
      const companiesQuery = await query(collection(db(), 'brands'), where('_id', 'in', filterLiked))

      const companiesData = await getDocs(companiesQuery)
      const brand = []
      companiesData.forEach(async (doc) => {
        const username = doc.data()?.instagram_url?.split('/')
        brand.push({
          company: {
            title: username[username.length - 1],
            location: doc.data()?.city || doc.data()?.loc_label || doc.data()?.loc_locality,
            image: doc.data()?.profile_image_url || defaultLogo,
            followers: doc.data()?.combined_followers,
            tags: [doc?.data()?.categories?.split('/')?.filter(Boolean), doc.data()?.main_categories].flatMap(
              (el) => el,
            ),
            id: doc.data()._id,
          },
          images: [defaultPicture],
        })
        // }
      })
      setBrands(brand)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error?.message)
      setLoading(false)
    }
  }, [])
  return { brands, brand, loading, error, fetchOneBrand, fetchAllBrands, fetchLikedBrands }
}
