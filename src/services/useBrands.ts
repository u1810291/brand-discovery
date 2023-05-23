/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useCallback } from 'react'
import {
  collection,
  getDocs,
  limit,
  query,
  where,
  startAt,
  orderBy,
  getFirestore,
  doc,
  or,
  and,
  endAt,
  endBefore,
  startAfter,
} from 'firebase/firestore'
import { db } from './firebase'
import { useAppDispatch } from 'src/store'
import { setAllBrands } from 'src/store/slices/brands'
import { SettingsType } from 'src/store/slices/settings'
import { UserData } from 'src/store/slices/auth/auth.slice'
import defaultLogo from '../../public/images/default_logo.svg'
import defaultPicture from '../../public/images/default_brand_image.png'
import { useGeolocationFilter } from './useGeolocationFilter'
import { useCategoriesFilter } from './useCompaniesFilter'
import { User } from 'firebase/auth'

export const useBrands = () => {
  const [brands, setBrands] = useState<any>()
  const [brand, setBrand] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const [unfilteredBrands, setUnfilteredBrands] = useState(null)
  const dispatch = useAppDispatch()
  const { getUserLocation } = useGeolocationFilter()
  const { getUserCategories, getCompanyCategory, companySuitsCategory } = useCategoriesFilter()

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

  const fetchAllBrands = useCallback(async (user: UserData, callBack: () => void) => {
    setLoading(true)
    try {
      const settingsRef = collection(db(), 'settings')
      const settingsQuery = query(settingsRef, where('uid', '==', user.uid))
      const settingsDocs = await getDocs(settingsQuery)

      if (settingsDocs.docs.length === 0) {
        console.error(`No user found with uid: ${user.uid}`)
        return
      }

      const settingsData = settingsDocs.docs[0].data() as SettingsType
      const userLocationData = await getUserLocation(user)

      const userRef = collection(db(), 'users')
      const userQuery = query(userRef, where('uid', '==', user.uid))
      const userDocs = await getDocs(userQuery)

      if (userDocs.docs.length === 0) {
        console.error(`No user found with uid: ${user.uid}`)
        return
      }

      const userData = userDocs.docs[0].data() as UserData
      const [northLat, northLon, southLat, southLon] = calculateBoundingBox(
        settingsData?.location?.latitude,
        settingsData?.location?.longitude,
        settingsData?.distance,
      )

      const companiesQuery = query(collection(db(), 'brands'), orderBy('main_categories'), limit(50))
      const companiesData = await getDocs(companiesQuery)

      const lastFetchedCompany = companiesData.docs[companiesData.docs.length - 1]
      // You can access the properties of the last fetched company here

      // Use the last fetched company data as needed
      const userCategories = await getUserCategories(user)

      const brandPromises = Array.from(companiesData.docs).map(async (doc) => {
        const username = doc?.data()?.instagram_url?.split('/')
        if (!userData?.likes?.map((el) => el?.company_id)?.includes(doc?.data()?._id)) {
          const companyCategories = await getCompanyCategory(doc?.data()._id)
          const ifCompanySuits = await companySuitsCategory({ userCategories, companyCategories })

          if (
            settingsData.filterByDistance &&
            doc?.data()?.loc_latitude <= northLat &&
            doc?.data()?.loc_latitude >= southLat &&
            doc?.data()?.loc_longitude >= northLon &&
            doc?.data()?.loc_longitude <= southLon &&
            ifCompanySuits
          ) {
            return {
              company: {
                title: username[username.length - 1],
                location: doc.data()?.city || doc.data()?.loc_label || doc.data()?.loc_locality,
                image: doc.data()?.profile_image_url || defaultLogo,
                followers: doc.data()?.combined_followers,
                tags: [doc.data()?.categories?.split('/')?.filter(Boolean), doc.data()?.main_categories]
                  ?.flatMap((el) => el)
                  .filter(Boolean),
                id: doc.data()?._id,
              },
              images: [defaultPicture],
            }
          } else if (!settingsData.filterByDistance && ifCompanySuits) {
            return {
              company: {
                title: username[username.length - 1],
                location: doc.data()?.city || doc.data()?.loc_label || doc.data()?.loc_locality,
                image: doc.data()?.profile_image_url || defaultLogo,
                followers: doc.data()?.combined_followers,
                tags: [doc.data()?.categories?.split('/')?.filter(Boolean), doc.data()?.main_categories]
                  ?.flatMap((el) => el)
                  .filter(Boolean),
                id: doc.data()?._id,
              },
              images: [defaultPicture],
            }
          }
        }
        return null
      })

      const resolvedBrands = await Promise.all(brandPromises)
      const filteredBrands = resolvedBrands.filter(Boolean)
      if (filteredBrands.length === 0) {
        // Fetch another 100 brands
        fetchAdditionalBrands(lastFetchedCompany, user, 50)
        if (filteredBrands.length === 0) {
          fetchAdditionalBrands(lastFetchedCompany, user, 100)
          if (filteredBrands.length === 0) {
            fetchAdditionalBrands(lastFetchedCompany, user, 500)
          }
        }
      }
      setBrands(filteredBrands)
      //@ts-expect-error correct types
      dispatch(setAllBrands(filteredBrands))

      setLoading(false)

      if (filteredBrands.length === 0 && callBack) {
        fetchAdditionalBrands(lastFetchedCompany, user, 50)
        if (filteredBrands.length === 0) {
          fetchAdditionalBrands(lastFetchedCompany, user, 100)
          if (filteredBrands.length === 0) {
            fetchAdditionalBrands(lastFetchedCompany, user, 500)
          }
        }
        callBack()
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
      setLoading(false)
      setError(error?.message)
    }
  }, [])

  const fetchAdditionalBrands = useCallback(
    async (lastDocument: any, user: UserData, limited?: number) => {
      try {
        const additionalCompaniesQuery = query(
          collection(db(), 'brands'),
          orderBy('main_categories'),
          startAfter(lastDocument),
          limit(limited ?? 100),
        )

        const additionalCompaniesSnapshot = await getDocs(additionalCompaniesQuery)

        if (!additionalCompaniesSnapshot.empty) {
          const additionalBrandPromises = additionalCompaniesSnapshot.docs.map(async (doc) => {
            const username = doc?.data()?.instagram_url?.split('/')
            if (!user?.likes?.map((el) => el?.company_id)?.includes(doc?.data()?._id)) {
              const userCategories = await getUserCategories(user)
              const companyCategories = await getCompanyCategory(doc?.data()._id)
              const ifCompanySuits = await companySuitsCategory({ userCategories, companyCategories })

              if (ifCompanySuits) {
                return {
                  company: {
                    title: username[username.length - 1],
                    location: doc.data()?.city || doc.data()?.loc_label || doc.data()?.loc_locality,
                    image: doc.data()?.profile_image_url || defaultLogo,
                    followers: doc.data()?.combined_followers,
                    tags: [doc.data()?.categories?.split('/')?.filter(Boolean), doc.data()?.main_categories]
                      ?.flatMap((el) => el)
                      .filter(Boolean),
                    id: doc.data()?._id,
                  },
                  images: [defaultPicture],
                }
              }
            }
            return null
          })

          const resolvedAdditionalBrands = await Promise.all(additionalBrandPromises)
          const filteredAdditionalBrands = resolvedAdditionalBrands.filter(Boolean)

          // Concatenate the additional brands with the existing brands
          const updatedBrands = [...brands, ...filteredAdditionalBrands]

          setBrands(updatedBrands)
          dispatch(setAllBrands(updatedBrands))
          setLoading(false)
        } else {
          // No additional brands available
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching additional brands:', error)
        setLoading(false)
        setError(error?.message)
      }
    },
    [brands],
  )
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
