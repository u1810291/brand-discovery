import { useCallback } from 'react'

export const getSavedData = useCallback((key: string) => {
  let data = localStorage.getItem(key)
  if (data) {
    try {
      data = JSON.parse(data)
    } catch (err) {
      console.error(err)
    }
    return data
  }
  return null
}, [])
