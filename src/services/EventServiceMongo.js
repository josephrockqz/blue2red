import axios from 'axios'

const url = '/api/posts'

class EventServiceMongo {
  // Get Scores
  static getScores() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(score => ({
            ...score
            // date: score.date,
            // name: score.name,
            // score: score.score
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  // Create Score
  static insertScore(score, name) {
    return axios.post(url, {
      score: score,
      name: name
    })
  }
}

export default EventServiceMongo
