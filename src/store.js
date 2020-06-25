import Vue from 'vue'
import Vuex from 'vuex'
import EventService from './services/EventService'
import EventServiceMongo from './services/EventServiceMongo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boolGameOff: true,
    errors: [],
    score: 0,
    scores: [],
    width: 10
  },
  mutations: {
    ADD_ERROR(state, error) {
      state.errors.push(error)
    },
    CHANGE_BOOL_GAME_OFF(state, bool) {
      state.boolGameOff = bool
    },
    CHANGE_SCORE(state, change) {
      state.score += change
    },
    SET_SCORE_TO_ZERO(state) {
      state.score = 0
    },
    SET_SCORES(state, data) {
      state.scores = data
    }
  },
  actions: {
    changeBoolGameOff({ commit }, { bool }) {
      commit('CHANGE_BOOL_GAME_OFF', bool)
    },
    changeScore({ commit }, change) {
      commit('CHANGE_SCORE', change)
    },
    setScoreToZero({ commit }) {
      commit('SET_SCORE_TO_ZERO')
    },
    getScores({ commit }) {
      return EventService.getScores().then(response => {
        commit('SET_SCORES', response.data)
      })
    },
    postScore({ commit }, { score }) {
      EventService.postScore(score).then(() => {
        commit('ADD_SCORE', score)
      })
    },
    getScoresMongo({ commit }) {
      return EventServiceMongo.getScores()
        .then(response => {
          commit('SET_SCORES', response)
        })
        .catch(error => {
          commit('ADD_ERROR', error)
        })
    },
    postScoreMongo({ commit }, { score, name }) {
      EventServiceMongo.insertScore(score, name).catch(error => {
        commit('ADD_ERROR', error)
      })
    }
  },
  modules: {}
})
