<template>
  <div>
    <h1>{{ profile.username }}님의 페이지</h1>

    <h2 style="margin:2rem; color:white;">작성한 글</h2>
    <ul>
      <div v-for="article in profile.articles" :key="article.pk">
        <router-link :to="{ name: 'article', params: { articlePk: article.pk } }">
          {{ article.title }}
        </router-link>
        <hr style="color:white; height:5px;">
      </div>
    </ul>
    <h2 style="margin:2rem; color:white;">작성한 리뷰</h2>
    <ul>
      <div v-for="review in profile.reviews" :key="review.pk">
        <router-link :to="{ name: 'review', params: { reviewPk: review.pk } }">
          [{{ review.movie_title}}] {{ review.title }} 
        </router-link>
        <b-form-rating
            id="rating-readonly"
            :value = "review.score"
            readonly
            precision="0"
            variant="danger" 
            size="sm"
            no-border
            inline
          ></b-form-rating>
        <hr style="color:white; height:5px;">
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ProfileView',
  computed: {
    ...mapGetters(['profile'])
  },
  methods: {
    ...mapActions(['fetchProfile'])
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>
