import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import articles from './modules/articles'
import accounts from './modules/accounts'
import movies from './modules/movies'
import reviews from './modules/reviews'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts, articles, movies, reviews },
  state: {
    zigiMovies: [],
    left: [],
    right: [],
    firstmovie: [],
    secondmovie: [],
    submovies: [],
    winners4: [],
    winners2: [],
    losers4: [],
    fgenres: [],
    recommendmovies: [],
    subresultmovies: [],
    resultmovies: [],
  },
  mutations: {
    ADD_ZIGI_MOVIE(state, movie) {
      state.zigiMovies.push(movie)
    },
    ADD_LEFT_RIGHT_8(state, zigiMovies) {
      state.left.push(zigiMovies.pop())
      state.right.push(zigiMovies.pop())
    },
    LEFT_WIN(state) {
      if (state.losers4.length !== 4) {
        state.winners4.push(state.left.pop())
        state.losers4.push(state.right.pop())
        if (state.zigiMovies.length !== 0) {
          state.left.push(state.zigiMovies.pop())
          state.right.push(state.zigiMovies.pop())
        }
        else {
          state.left.push(state.winners4.pop())
          state.right.push(state.winners4.pop())
        }
      }
      else if (state.submovies.length !== 2) {
        state.winners2.push(state.left.pop())
        state.submovies.push(state.right.pop())
        if (state.winners4.length !== 0) {
          state.left.push(state.winners4.pop())
          state.right.push(state.winners4.pop())
        }
        else {
          state.left.push(state.winners2.pop())
          state.right.push(state.winners2.pop())
        }
      }
      else {
        state.firstmovie.push(state.left.pop())
        state.secondmovie.push(state.right.pop())
      }

    },
    RIGHT_WIN(state) {
      if (state.losers4.length !== 4) {
        state.winners4.push(state.right.pop())
        state.losers4.push(state.left.pop())
        if (state.zigiMovies.length !== 0) {
          state.left.push(state.zigiMovies.pop())
          state.right.push(state.zigiMovies.pop())
        }
        else {
          state.left.push(state.winners4.pop())
          state.right.push(state.winners4.pop())
        }
      }
      else if (state.submovies.length !== 2) {
        state.winners2.push(state.right.pop())
        state.submovies.push(state.left.pop())
        if (state.winners4.length !== 0) {
          state.left.push(state.winners4.pop())
          state.right.push(state.winners4.pop())
        }
        else {
          state.left.push(state.winners2.pop())
          state.right.push(state.winners2.pop())
        }
      }
      else {
        state.firstmovie.push(state.right.pop())
        state.secondmovie.push(state.left.pop())
      }
    },
    MAKE_RECOMMEND_MOVIES(state) {
      if (state.fgenres.length === 0) {
        for (let fisrtgenre_id1 of state.firstmovie[0]["genre_ids"]) {
          state.fgenres.push(fisrtgenre_id1)
        }
        for (let fisrtgenre_id2 of state.firstmovie[0]["genre_ids"]) {
          state.fgenres.push(fisrtgenre_id2)
        }
        for (let fisrtgenre_id3 of state.firstmovie[0]["genre_ids"]) {
          state.fgenres.push(fisrtgenre_id3)
        }
        for (let secondgenre_id1 of state.secondmovie[0]["genre_ids"]) {
          state.fgenres.push(secondgenre_id1)
        }
        for (let secondgenre_id2 of state.secondmovie[0]["genre_ids"]) {
          state.fgenres.push(secondgenre_id2)
        }
        for (let submovie of state.submovies) {
          for (let sub_id of submovie["genre_ids"]) {
            state.fgenres.push(sub_id)
          }
        }
        while (state.recommendmovies.length < 3) {
          state.recommendmovies.push(_.sample(state.fgenres))
        }
      }
    },
    ADD_MOVIE_LIST(state, zigimovies) {
      for (let recommendmovie of state.recommendmovies) {
        for (let zigimovie of zigimovies) {
          for (let zigigenre of zigimovie.genre_ids) {
            if (recommendmovie === zigigenre) {
              state.subresultmovies.push(zigimovie)
            }
          }
        }
      }
      while (state.resultmovies.length < 6) {
        state.resultmovies.push(_.sample(state.subresultmovies))
      }
    }


  },
  actions: {
    addZigiMovie(context, movie) {
      context.commit('ADD_ZIGI_MOVIE', movie)
    },
    addleftright8(context, zigiMovies) {
      context.commit('ADD_LEFT_RIGHT_8', zigiMovies)
    },
    leftwin(context) {
      context.commit('LEFT_WIN')
    },
    rightwin(context) {
      context.commit('RIGHT_WIN')
    },
    makerecommendmovies(context) {
      context.commit('MAKE_RECOMMEND_MOVIES')
    },
    addmovielist(context, zigimovies) {
      context.commit('ADD_MOVIE_LIST', zigimovies)
    }

  },
})
