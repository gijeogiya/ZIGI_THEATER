import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'

export default {
  state: {
    reviews: [],
    review: {},
  },

  getters: {
    reviews: state => state.reviews,
    review: state => state.review,
    isReviewAuthor: (state, getters) => {
        return state.review.user?.username === getters.currentUser.username
    },
    isReview: state => !_.isEmpty(state.review),
},


  mutations: {
    SET_REVIEWS: (state, reviews) => state.reviews = reviews,
    SET_REVIEW: (state, review) => state.review = review,
    SET_REVIEW_COMMENTS: (state, reviewcomments) => (state.review.reviewcomments = reviewcomments),
  },

  actions: {
    fetchReviews({ commit, getters }) {
      axios({
        url: drf.community.reviews(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_REVIEWS', res.data))
        .catch(err => console.error(err.response))
    },

    fetchReview({ commit, getters }, reviewPk) {
      axios({
        url: drf.community.review(reviewPk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_REVIEW', res.data))
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    createReview({ commit, getters }, review) {
     
      axios({
        url: drf.community.reviews(),
        method: 'post',
        data: review,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
          router.push({
            name: 'review',
            params: { reviewPk: getters.review.pk }
          })
        })
    },

    updateReview({ commit, getters }, { pk, title, content, score, movie_title}) {
      axios({
        url: drf.community.review(pk),
        method: 'put',
        data: { title, content, score, movie_title },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
          router.push({
            name: 'review',
            params: { reviewPk: getters.review.pk }
          })
        })
    },

    deleteReview({ commit, getters }, reviewPk) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.community.review(reviewPk),
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(() => {
            commit('SET_REVIEW', {})
            router.push({ name: 'reviews' })
          })
          .catch(err => console.error(err.response))
      }
    },

    createReviewComment({ commit, getters }, { reviewPk, content }) {
      const reviewcomment = { content }

      axios({
        url: drf.community.review_comments(reviewPk),
        method: 'post',
        data: reviewcomment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    updateReviewComment({ commit, getters }, { reviewPk, reviewcommentPk, content }) {
      const reviewcomment = { content }

      axios({
        url: drf.community.review_comment(reviewPk, reviewcommentPk),
        method: 'put',
        data: reviewcomment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_review_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteReviewComment({ commit, getters }, { reviewPk, reviewcommentPk }) {

        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.community.review_comment(reviewPk, reviewcommentPk),
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              commit('SET_REVIEW_COMMENTS', res.data)
            })
            .catch(err => console.error(err.response))
        }
      },
      
  },
}
