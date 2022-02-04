import { Place } from '@googlemaps/google-maps-services-js'
import { searchGiphy } from '../service/giphy'

export const createPlace = (place: Place) => {
  const scene = document.querySelector('a-scene')

  const createGps = () => {
    const gps = document.createAttribute('gps-entity-place')
    gps.value = `latitude: ${place.geometry.location.lat}; longitude: ${place.geometry.location.lng};`

    return gps
  }

  const text = document.createElement('a-text')
  text.setAttributeNode(createGps())
  text.setAttribute('value', place.name)
  text.setAttribute('color', 'red')
  text.setAttribute('width', '50')
  scene.appendChild(text)

  const cone = document.createElement('a-cone')
  cone.setAttribute('width', '0.5')
  cone.setAttribute('height', '2')
  cone.setAttribute('color', place.icon_background_color)
  cone.setAttributeNode(createGps())
  scene.appendChild(cone)

  const plane = document.createElement('a-plane')
  plane.setAttribute('width', '8')
  plane.setAttribute('height', '6')
  plane.setAttribute('color', 'white')
  plane.setAttribute('look-at', '[gps-camera]')
  plane.setAttribute('position', '0 4 2')
  plane.setAttributeNode(createGps())
  // not working
  plane.addEventListener('click', () => {
    alert('clicked')
  })
  scene.appendChild(plane)

  const loadingText = document.createElement('a-text')
  loadingText.setAttribute('value', 'Loading...')
  loadingText.setAttribute('color', 'black')
  loadingText.setAttribute('width', '18')
  loadingText.setAttribute('position', '0 4 0')
  loadingText.setAttribute('align', 'center')
  loadingText.setAttribute('look-at', '[gps-camera]')
  loadingText.setAttribute('z-offset', '1')
  loadingText.setAttributeNode(createGps())
  scene.appendChild(loadingText)

  searchGiphy(place.name)
    .then(data => {
      // not working
      loadingText.setAttribute('value', place.name)
      plane.remove()

      const gif = document.createElement('a-image')
      gif.setAttribute('src', data.mp4)
      gif.setAttribute('width', '8')
      gif.setAttribute(
        'height',
        String((Number(data.height) * 8) / Number(data.width))
      )
      gif.setAttribute('look-at', '[gps-camera]')
      gif.setAttribute('position', '0 4 2')
      gif.setAttributeNode(createGps())
      // not working
      gif.addEventListener('click', () => {
        alert('clicked')
      })
      scene.appendChild(gif)
    })
    .catch(err => {
      console.error(err)
    })
}
