import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const APIUrl = '/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    services : [],
    chosenService : [],
    questions : [],
    pageNumber : 1,
    answers : []
  },
  getters : {
    getServices(state){
      return state.services;
    },
    getChosenService(state){
      return state.chosenService;
    },
    getQuestions(state){
      return state.questions;
    },
    getPageNumber(state){
      return state.pageNumber;
    },
    getAnswers(state){
      return state.answers;
    }
  },
  mutations: {
    setServices(state, services){
      state.services = services
    },
    setChosenService(state, service){
      state.chosenService = service;
    },
    setQuestions(state,questions){
      state.questions = questions;
      for (let index = 0; index < questions.length; index++) {
        state.answers.push({
          'answer' : null
        })
        
      }
    },
    updatePageNumber(state, payload){
      state.pageNumber = state.pageNumber + payload;
    },
    clearState(state){
      state.chosenService = [],
      state.questions = [],
      state.pageNumber = 1,
      state.answers = []
    },
    setAnswers(state,payload){
      state.answers[state.pageNumber - 1].answer = payload;
    }
  },
  actions: {
    getServices({commit}){
      axios.get(`${APIUrl}/services.json`)
          .then((response) =>{
            commit('setServices', response.data)
          })
    },
    getQuestions({commit},payload){
      axios.get(`${APIUrl}/${payload}-questions.json`)
          .then(response =>{
            commit('setQuestions',response.data)
          })
    }
  },
  modules: {
  }
})
