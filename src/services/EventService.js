import axios from 'axios'

// const apiClient = axios.create({
//   baseURL: `http://localhost:3000`,
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   },
//   timeout: 10000
// })

const apiClient = axios.create({
  baseURL: `https://18.188.54.151:3000`,
  // withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getScores() {
    return apiClient.get('/scores')
  },
  postScore(score) {
    return apiClient.post('/scores', score)
  }
}
