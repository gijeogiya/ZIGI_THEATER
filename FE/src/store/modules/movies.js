import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'

export default {
  state: {
    movies: [],
    movie: {},
    zigimovies: []
  },

  getters: {
    movies: state => state.movies,
    movie: state => state.movie,
    isMovie: state => !_.isEmpty(state.movie),
    zigimovies: state => state.zigimovies,
  },

  mutations: {
    SET_MOVIES: (state, movies) => state.movies = movies,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_MOVIE_POINTS: (state, points) => (state.movie.points = points),
    SET_ZIGI_MOVIES: (state, zigimovies) => (state.zigimovies = zigimovies)

  },
  actions: {
    fetchMovies({ commit, getters }) {
      axios({
        url: drf.movies.movies(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIES', res.data))
        .catch(err => console.error(err.response))
    },

    fetchMovie({ commit, getters }, moviePk) {
      axios({
        url: drf.movies.movie(moviePk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_MOVIE', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    fetchZigiMovies({ commit, getters }) {
      axios({
        url: drf.movies.result(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_ZIGI_MOVIES', res.data))
        .catch(err => console.error(err.response))
    },

    createPoint({ commit, getters }, { moviePk, content, grade }) {
      const point = { content, grade }

      axios({
        url: drf.movies.points(moviePk),
        method: 'post',
        data: point,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_POINTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    updatePoint({ commit, getters }, { moviePk, pointPk, content, grade }) {
      const point = { content, grade }

      axios({
        url: drf.movies.point(moviePk, pointPk),
        method: 'put',
        data: point,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE_POINTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deletePoint({ commit, getters }, { moviePk, pointPk }) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.movies.point(moviePk, pointPk),
          method: 'delete',
          data: {},
          headers: getters.authHeader,
        })
          .then(res => {
            commit('SET_MOVIE_POINTS', res.data)
          })
          .catch(err => console.error(err.response))
      }
    },
  },
}
