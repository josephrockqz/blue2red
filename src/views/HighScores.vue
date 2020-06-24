<template>
  <div>
    <h2>High Scores</h2>

    <b-card no-body bg-variant="dark" class="scores-box">
      <b-tabs pills card justified>
        <b-tab no-body title="All Time">
          <b-button
            :disabled="currentPage < 2"
            @click="currentPage--"
            style="margin-right: 2px;"
            >Prev</b-button
          >
          <b-button
            :disabled="currentPage * perPage >= scores.length"
            @click="currentPage++"
            style="margin-left: 2px;"
            >Next</b-button
          >

          <b-table
            :items="scores"
            :fields="fields"
            small
            fixed
            responsive="sm"
            dark
            :perPage="perPage"
            :currentPage="currentPage"
          ></b-table>
        </b-tab>
        <b-tab no-body title="This Month">
          <b-button
            :disabled="currentPageMonth < 2"
            @click="currentPageMonth--"
            style="margin-right: 2px;"
            >Prev</b-button
          >
          <b-button
            :disabled="currentPageMonth * perPage >= scoresCurrentMonth.length"
            style="margin-left: 2px;"
            @click="currentPageMonth++"
            >Next</b-button
          >

          <b-table
            :items="scoresCurrentMonth"
            :fields="fields"
            small
            fixed
            responsive="sm"
            dark
            :perPage="perPage"
            :currentPage="currentPageMonth"
          ></b-table>
        </b-tab>
        <b-tab no-body title="Today">
          <b-button
            :disabled="currentPageToday < 2"
            @click="currentPageToday--"
            style="margin-right: 2px;"
            >Prev</b-button
          >
          <b-button
            :disabled="currentPageToday * perPage >= scoresToday.length"
            @click="currentPageToday++"
            style="margin-left: 2px;"
            >Next</b-button
          >

          <b-table
            :items="scoresToday"
            :fields="fields"
            small
            fixed
            responsive="sm"
            dark
            :perPage="perPage"
            :currentPage="currentPageToday"
          ></b-table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'

export default {
  data() {
    return {
      fields: ['rank', 'name', 'score'],
      currentPage: 1,
      currentPageMonth: 1,
      currentPageToday: 1,
      perPage: 10,
      scoresCurrentMonth: [],
      scoresToday: []
    }
  },
  computed: {
    ...mapState({
      scores: 'scores'
    })
  },
  methods: {
    compareScores(a, b) {
      const score1 = a.score
      const score2 = b.score
      return score2 - score1
    },
    async getScores() {
      let i = store.dispatch('getScoresMongo')
      // let i = store.dispatch('getScores')
      await i
      this.scores.sort(this.compareScores)
      for (let i = 0; i < this.scores.length; i++) {
        this.scores[i].rank = i + 1
      }
    },
    async getScoresMonth() {
      await this.getScores()
      const d = new Date()
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      this.scores.forEach(score => {
        let slash1 = score.date.indexOf('/')
        let slash2 = score.date.indexOf('/', slash1 + 1)
        let at = score.date.indexOf('@')
        let mScore = score.date.slice(slash1 + 1, slash2)
        let yScore = score.date.slice(slash2 + 1, at)
        if (month == mScore && year == yScore) {
          this.scoresCurrentMonth.push(score)
        }
      })
      for (let i = 0; i < this.scoresCurrentMonth.length; i++) {
        this.scoresCurrentMonth[i].rank = i + 1
      }
    },
    async getScoresToday() {
      await this.getScores()
      const d = new Date()
      const day = d.getDate()
      const month = d.getMonth() + 1
      const year = d.getFullYear()
      this.scores.forEach(score => {
        let slash1 = score.date.indexOf('/')
        let slash2 = score.date.indexOf('/', slash1 + 1)
        let at = score.date.indexOf('@')
        let dScore = score.date.slice(0, slash1)
        let mScore = score.date.slice(slash1 + 1, slash2)
        let yScore = score.date.slice(slash2 + 1, at)
        if (day == dScore && month == mScore && year == yScore) {
          this.scoresToday.push(score)
        }
      })
      for (let i = 0; i < this.scoresToday.length; i++) {
        this.scoresToday[i].rank = i + 1
      }
    }
  },
  async created() {
    let w = this.getScores(this.currentPage)
    await w
    let x = this.getScoresMonth()
    await x
    let y = this.getScoresToday()
    await y
  },
  updated() {
    for (let i = 0; i < this.scores.length; i++) {
      this.scores[i].rank = i + 1
    }
  }
}
</script>

<style scoped>
.scores-box {
  width: 1000px;
  min-height: 495px;
  margin: auto;
}
</style>
