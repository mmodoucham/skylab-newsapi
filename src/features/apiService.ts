import axios from 'axios'
// import 'dotenv/config'

interface Params {
  q?: string
  language?: string
  sortBy?: string
  category?: string
}
export const fetchDataFromAPI = async (
  searchInput?: string,
  activeCategory?: string,
  sortBy?: string,
  selectedLanguage?: string,
) => {
  const BASE_URL = 'https://newsapi.org/v2/'
  const API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXX'
  let ENDPOINT = 'everything'
  const params: Params = {
    q: searchInput || '',
  }
  // if (!searchInput) {
  //   ENDPOINT = 'everything'
  // }
  if (selectedLanguage !== '') {
    params.language = selectedLanguage
  }
  if (sortBy !== '') {
    params.sortBy = sortBy
  }

  if (activeCategory !== '') {
    params.category = activeCategory
    ENDPOINT = 'top-headlines'
  }
  const response = await axios.get(BASE_URL + ENDPOINT || '', {
    params,
    headers: {
      'X-API-KEY': API_KEY || '',
    },
  })

  if (response.status === 200) {
    return response.data.articles
  } else {
    throw new Error('API request failed ')
  }
}
