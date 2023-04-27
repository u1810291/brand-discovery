import { useCallback, useState } from 'react'

export type CoordinatesType = {
  accuracy: number
  latitude: number
  longitude: number
  name: string
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<CoordinatesType>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>()

  const getLocation = useCallback(() => {
    setLoading(true)
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    async function success(pos) {
      const crd: CoordinatesType = pos.coords
      const position = await getLocations(crd.latitude, crd.longitude)
      setLocation({
        accuracy: crd.accuracy,
        latitude: crd.latitude,
        longitude: crd.longitude,
        name: position?.address?.city || position?.address?.country,
      })
      setLoading(false)
    }

    function hasError(err) {
      setError(`ERROR(${err.code}): ${err.message}`)
      setLoading(false)
    }
    navigator.geolocation.getCurrentPosition(success, hasError, options)
  }, [])
  return { getLocation, location, error, loading }
}

export async function getLocations(lat: number, lon: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GET_COUNTRIES_AND_CITY_ENDPOINT}/reverse?format=json&addressdetails=1&format=json&limit=5&lat=${lat}&lon=${lon}`,
  )
  const data = res.json()
  return data
}
