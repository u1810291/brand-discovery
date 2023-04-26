import { useCallback, useState } from 'react'

export type CoordinatesType = {
  accuracy: number
  latitude: number
  longitude: number
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
    function success(pos) {
      const crd: CoordinatesType = pos.coords
      setLocation({
        accuracy: crd.accuracy,
        latitude: crd.latitude,
        longitude: crd.longitude,
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
