import { useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { query, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { SettingsType } from 'src/store/slices/settings'

interface Coordinates {
  longitude: number
  latitude: number
}

export interface CompaniesType {
  _id: string
  categories: string
  loc_latitude: number
  loc_longitude: number
  main_categories: string
  facebook_url?: string
  combined_followers?: string
  description?: string
  instagram_followers?: string
  picture_1: string
  picture_2?: string
  picture_3?: string
  picture_4?: string
  picture_5?: string
  profile_image_url?: string
  profile_name: string
}

interface CheckCompanyPayload {
  distance: number
  userCoordinates: Coordinates
  companyCoordinates: Coordinates
}

export const UseGeolocationFilter = () => {
  const getUserLocation = useCallback(async (user: UserData): Promise<Coordinates> => {
    try {
      const q = query(collection(db(), 'settings'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      const userRef = docs.docs[0].ref

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const userData = docs.docs[0].data() as SettingsType

      if (!userData.hasOwnProperty('location')) {
        await updateDoc(userRef, {
          location: {
            latitude: 40.73061,
            longitude: -73.935242,
            name: 'New York',
          },
        })
        return { latitude: 40.73061, longitude: -73.935242 }
      }
      return { longitude: userData.location.longitude as number, latitude: userData.location.latitude as number }
    } catch (err) {
      throw Error(err)
    }
  }, [])

  const getCompanyLocation = useCallback(async (orgId: string): Promise<Coordinates> => {
    try {
      const q = query(collection(db(), 'companies'), where('_id', '==', orgId))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No company found with id: ${orgId}`)
      }
      const companyData = docs.docs[0].data() as CompaniesType

      if (!companyData.hasOwnProperty('loc_latitude') || !companyData.hasOwnProperty('loc_longitude')) {
        throw Error('no company location was found')
      }
      return { latitude: companyData.loc_latitude, longitude: companyData.loc_longitude }
    } catch (err) {
      throw Error(err)
    }
  }, [])

  const companySuitsGeoData = useCallback((payload: CheckCompanyPayload): boolean => {
    const { distance, userCoordinates, companyCoordinates } = payload

    const company_r_lat = (userCoordinates.latitude * Math.PI) / 180
    const company_r_lon = (userCoordinates.longitude * Math.PI) / 180
    const user_r_lat = (companyCoordinates.latitude * Math.PI) / 180
    const user_r_lon = (companyCoordinates.longitude * Math.PI) / 180

    const dlon = user_r_lon - company_r_lon
    const dlat = user_r_lat - company_r_lat

    const a =
      Math.pow(Math.sin(dlat / 2), 2) + Math.cos(company_r_lat) * Math.cos(user_r_lat) * Math.pow(Math.sin(dlon / 2), 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const km = 6371 * c
    const miles = km / 1.609344

    return miles < distance
  }, [])

  return { getUserLocation, getCompanyLocation, companySuitsGeoData }
}
