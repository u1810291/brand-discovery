import { useState, useEffect } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db, st } from './firebase'
import { useAppDispatch } from 'src/store'
import { BrandsType, setAllBrands } from 'src/store/slices/brands'

export const useBrands = () => {
  const [brands, setBrands] = useState<Array<BrandsType>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true)
      try {
        const q = await query(collection(db(), 'companies'), limit(50))
        const data = await getDocs(q)
        const brand = []
        data.forEach(async (doc) => {
          // const cityDetails = await getCityDetails(doc.data().loc_latitude, doc.data().loc_longitude)
          // console.error('cityDetails', cityDetails)
          brand.push({
            company: {
              title: doc.data().profile_name,
              location: `${doc.data().loc_latitude} ,  ${doc.data().loc_longitude}`,
              image: doc.data().profile_image_url,
              followers: doc.data().combined_followers ?? doc.data().instagram_followers ?? '',
              tags: doc.data().categories?.split('/').filter(Boolean).slice(0, 3),
              id: doc.data()._id,
            },
            images: ['https://mariosingh.com/wp-content/uploads/2020/03/shutterstock_327351386.jpg'],
          })
        })
        setBrands(brand)
        dispatch(setAllBrands(brand))
      } catch (error) {
        setError(error?.message)
      }
      setLoading(false)
    }

    fetchBrands()
  }, [])

  return { brands, loading, error }
}

// export async function getCityDetails(lat: number, lon: number) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_GET_COUNTRIES_AND_CITY_ENDPOINT}/reverse?format=json&addressdetails=1&format=json&limit=5&lat=${lat}&lon=${lon}`,
//   )
//   const data = res.json()
//   return data
// }
