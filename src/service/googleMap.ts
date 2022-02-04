import axios, { AxiosRequestConfig } from 'axios'
import type { Place } from '@googlemaps/google-maps-services-js'

export const searchNearby = async ({
  lng,
  lat,
}: {
  lng: number
  lat: number
}): Promise<Place[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: '/api/nearby',
    headers: {},
    params: {
      lat,
      lng,
    },
  }

  return await axios(config)
    .then(res => res.data.results)
    .catch(err => {
      console.error(err)
    })
}
