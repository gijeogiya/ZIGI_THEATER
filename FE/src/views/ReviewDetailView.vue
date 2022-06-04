<template>
  <div>
    <ul class="d-flex justify-content mt-5">
      <div class="col-5">
        <h1 style="color: white; margin-bottom: 0px; margin-left: 2rem;">{{ review.movie_title }}</h1>
        <div v-for="movie in movies" :key="movie.id">
          <div v-if="movie.title  === review.movie_title">
            <router-link 
              :to="{ name: 'movie', params: {moviePk: movie.id} }">
                <p class="px-0">>> {{review.movie_title}} 상세정보 보러가기 </p>
            </router-link>
            <img class="img-fluid" :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" alt="image">
          </div>
        </div>
      </div>

      <div class="col-7 mt-5">
        <p class="px-0">작성자: {{ review.user.username }}</p>
        <h3 style="color: white;">{{ review.title }}</h3>
        <!-- <hr style="color: white; height: 5px;"> -->
        <label class = "ms-0" for="rating-readonly">평점: </label>
          <b-form-rating
            id="rating-readonly"
            :value = "review.score"
            readonly
            precision="0"
            variant="danger" 
            size="lg"
            no-border
            inline
          ></b-form-rating>
        <!-- <h4 style="color: white; margin-bottom: 0px;">{{review.score}}</h4> -->
        <hr style="color: white; height: 5px;">

        <h5 class="mb-5">
          {{ review.content }}
        </h5>

        <!-- review Edit/Delete UI -->
        <div class="mx-0" v-if="isReviewAuthor">
          <router-link :to="{ name: 'reviewEdit', params: { reviewPk } }">
            <button>Edit</button>
          </router-link>
          <button @click="deleteReview(reviewPk)">Delete</button>

        </div>

        <review-comment-list :reviewcomments="review.reviewcomments" ></review-comment-list>
      </div>
            
    </ul>
          
   
    <!-- Comment UI -->

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ReviewCommentList from '@/components/ReviewCommentList.vue'

  export default {
    name: 'ReviewDetail',
    components: { ReviewCommentList },
    data() {
      return {
        reviewPk: this.$route.params.reviewPk,
      }
    },
    computed: {
      ...mapGetters(['isReviewAuthor', 'review','movies']),
        
    },
    methods: {
      ...mapActions([
        'fetchReview',
        'likeReview',
        'deleteReview',
      ])
    },
    created() {
      this.fetchReview(this.reviewPk)
    },
  }
</script>

<style>

p {
  
  color: white;
  
}
h5 {
  color: white;


}
.b-rating.d-inline-flex {
    width: auto;
    background-color: black;
}
</style>
