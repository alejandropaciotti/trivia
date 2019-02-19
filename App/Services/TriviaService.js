import { create } from 'apisauce'
import { Config } from 'App/Config'

const questionsApiClient = create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchQuestions() {
  return questionsApiClient.get().then((response) => {
    if (response.ok) {
      return response.data
    }

    return null
  })
}

export const triviaService = {
  fetchQuestions,
}
