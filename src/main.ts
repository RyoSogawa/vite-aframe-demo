import './style.css'
import { searchNearby } from './service/googleMap'
import { createPlace } from './components/Place'
import { getCurrentLocation } from './lib/geolocation'

const setup = async () => {
  const { lng, lat } = await getCurrentLocation()
  const places = await searchNearby({ lng, lat })

  places.forEach(place => {
    createPlace(place)
  })
}

setup()
  .then(() => {
    console.log('loaded')
  })
  .catch(err => {
    console.error(err)
  })
