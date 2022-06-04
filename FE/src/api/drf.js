const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'accounts/'
const COMMUNITY = 'community/'
const MOVIES = 'movies/'
const COMMENTS = 'comments/'


export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    profile: username => HOST + ACCOUNTS + 'profile/' + username,
  },
  community: {
    articles: () => HOST + COMMUNITY + 'article/',
    article: articlePk => HOST + COMMUNITY + 'article/' + `${articlePk}/`,
    comments: articlePk => HOST + COMMUNITY + 'article/' + `${articlePk}/` + COMMENTS,
    comment: (articlePk, commentPk) =>
      HOST + COMMUNITY + 'article/' + `${articlePk}/` + COMMENTS + `${commentPk}/`,

    reviews: () => HOST + COMMUNITY + 'review/',
    review: reviewPk => HOST + COMMUNITY + 'review/' + `${reviewPk}/`,
    review_comments: reviewPk => HOST + COMMUNITY + 'review/' + `${reviewPk}/` + COMMENTS,
    review_comment: (reviewPk, reviewcommentPk) =>
      HOST + COMMUNITY + 'review/' + `${reviewPk}/` + COMMENTS + `${reviewcommentPk}/`,
  },
  movies: {
    movies: () => HOST + MOVIES,
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    points: moviePk => HOST + MOVIES + `${moviePk}/` + 'points/',
    point: (moviePk, pointPk) => HOST + MOVIES + `${moviePk}/` + 'points/' + `${pointPk}/`,
    result: () => HOST + MOVIES + 'zigiresult/'

  }
}
