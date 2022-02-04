import {
  Client,
  Language,
  PlacesNearbyResponse,
} from '@googlemaps/google-maps-services-js'
import { AxiosError } from 'axios'

export default async function handler(req, res) {
  const { lat, lng, ...restParam } = req.query

  const client = new Client({})

  const response: PlacesNearbyResponse | void = await client
    .placesNearby({
      params: {
        key: process.env.GOOGLE_MAP_API_KEY,
        radius: 150,
        language: Language.ja,
        location: { lat: Number(lat), lng: Number(lng) },
        ...restParam,
      },
      timeout: 1000, // milliseconds
    })
    .catch((e: AxiosError) => {
      console.warn(e.response.data.error_message)
      res.statusCode = e.response.status
    })

  if (response) {
    res.status(200).json(response.data)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}
