import giphyApi from 'giphy-api'

export default async function handler(req, res) {
  const { keyword } = req.query

  const giphy = giphyApi({
    apiKey: process.env.GIPHY_API_KEY,
    timeout: 3000,
  })

  const response = await giphy
    .search({ q: keyword as string, limit: 1, rating: 'g' })
    .catch(err => {
      res.status(500)
      console.error(err)
    })

  if (response && response.data && response.data.length > 0) {
    const image = response.data[0].images.preview

    res.status(200).json({ image })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}
