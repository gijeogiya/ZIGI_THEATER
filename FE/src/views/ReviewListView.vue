<template>
  <div>
    <h1 style="margin-top:4rem;" class="text-center">리뷰게시판</h1>
    
    <router-link style="margin-left: 5px;" :to="{ name: 'reviewNew' }">
      <h4 style="margin-left:2rem;">>> Create</h4></router-link>
    <hr>
    
    <ul>

      <div style="color:white;" v-for="review in reviews" :key="review.pk">
        <!-- 작성자 -->
        {{ review.user.username }}  || 

        <!-- 글 이동 링크 (제목) -->
        <router-link 
          :to="{ name: 'review', params: {reviewPk: review.pk} }">
          [ {{review.movie_title}} ] {{ review.title }}
        </router-link>

        <!-- 댓글 개수/좋아요 개수 -->
        
        ({{ review.reviewcomment_count }}) 

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
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ReviewList',
    computed: {
      ...mapGetters(['reviews','review'])
    },
    methods: {
      ...mapActions(['fetchReviews'])
    },
    created() {
      this.fetchReviews()
    },
  }
</script>

<style>
li {
  color:white;
}
div {
  background-color: black;
}
</style>
