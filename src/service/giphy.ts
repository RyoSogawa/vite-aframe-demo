import axios, { AxiosRequestConfig } from 'axios'
import type { Images } from 'giphy-api'
type SearchGiphyResponse = Images['preview']

export const searchGiphy = async (
  keyword: string
): Promise<SearchGiphyResponse> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: '/api/searchGiphy',
    headers: {},
    params: { keyword },
  }

  return await axios(config)
    .then(res => res.data.image)
    .catch(err => {
      console.error(err)
    })
}
