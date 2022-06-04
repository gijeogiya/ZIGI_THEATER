import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import ArticleListView from '@/views/ArticleListView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ArticleNewView from '@/views/ArticleNewView'
import ArticleEditView from '@/views/ArticleEditView'

import ReviewListView from '@/views/ReviewListView.vue'
import ReviewDetailView from '@/views/ReviewDetailView.vue'
import ReviewNewView from '@/views/ReviewNewView'
import ReviewEditView from '@/views/ReviewEditView'

import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFound404 from '../views/NotFound404.vue'

import MovieListView from '@/views/MovieListView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'

import ZigiView from '@/views/ZigiView.vue'
import ZigiResultView from '@/views/ZigiResultView.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/',  // Home
    name: 'movies',
    component: MovieListView
  },
  {
    path: '/movies/:moviePk',
    name: 'movie',
    component: MovieDetailView
  },
  {
    path: '/community/articles/',
    name: 'articles',
    component: ArticleListView

  },
  {
    path: '/community/articles/new',
    name: 'articleNew',
    component: ArticleNewView
  },
  {
    path: '/community/articles/:articlePk',
    name: 'article',
    component: ArticleDetailView
  },
  {
    path: '/community/articles/:articlePk/edit',
    name: 'articleEdit',
    component: ArticleEditView
  },
  {
    path: '/community/reviews/', 
    name: 'reviews',
    component: ReviewListView

  },
  {
    path: '/community/reviews/new',
    name: 'reviewNew',
    component: ReviewNewView
  },
  {
    path: '/community/reviews/:reviewPk',
    name: 'review',
    component: ReviewDetailView
  },
  {
    path: '/community/reviews/:reviewPk/edit',
    name: 'reviewEdit',
    component: ReviewEditView
  },
  {
    path: '/',
    name: 'zigi',
    component: ZigiView
  },
  {
    path: '/zigiresult',
    name: 'zigiresult',
    component: ZigiResultView
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 이전 페이지에서 발생한 에러메시지 삭제
  store.commit('SET_AUTH_ERROR', null)

  const { isLoggedIn } = store.getters

  const noAuthPages = ['login', 'signup']

  const isAuthRequired = !noAuthPages.includes(to.name)

  if (isAuthRequired && !isLoggedIn) {
    alert('Require Login. Redirecting..')
    next({ name: 'login' })
  } else {
    next()
  }

  if (!isAuthRequired && isLoggedIn) {
    next({ name: 'movies' })
  }
})

export default router
