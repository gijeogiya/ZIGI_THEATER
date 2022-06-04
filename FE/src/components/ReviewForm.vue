<template>
  <form style="margin: 2rem" @submit.prevent="onSubmit">
    <div>
      <label style="color: white; margin: 1.5rem" for="title">Title: </label>
      <input style="width: 20rem" v-model="newReview.title" type="text" id="title" />
    </div>
    <div>
      <label style="color: white; margin: 1rem" for="movie_title">Movie: </label>
      <input style="width: 20rem" v-model="newReview.movie_title" type="text" id="movie_title" />
    </div>
    <div class="col-4">
       <b-form-rating v-model="newReview.score" variant="danger" class="mb-2 ms-4 justify-content-center" size="lg" ></b-form-rating>
       <p class="mt-2">Score: {{ newReview.score }}</p>
      <!-- <label style="color: white; margin: 1rem" for="score">score: </label>
      <input style="width: 20rem" v-model="newReview.score" type="float" id="score" /> -->
    </div>
    <div>
      <label style="color: white; margin: 0.5rem" for="ontent">Content: </label>
      <textarea style="width: 20rem; height: 30rem;" v-model="newReview.content" type="text" id="content"></textarea>
    </div>
    <div>
      <button>{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'ReviewForm',
    props: {
      review: Object,
      action: String,
    },
    data() {
      return {
        newReview: {
          title: this.review.title,
          movie_title: this.review.movie_title,
          score: this.review.score,
          content: this.review.content,
        }
      }
    },

    methods: {
      ...mapActions(['createReview', 'updateReview']),
      onSubmit() {
        if (this.action === 'create') {
          this.createReview(this.newReview)
        } else if (this.action === 'update') {
          const payload = {
            pk: this.review.pk,
            ...this.newReview,
          }
          this.updateReview(payload)
        }
      },
    },
  }
</script>

<style>
.flex-grow-1 {
    flex-grow: 0.05!important;

}
.ms-4 {
    margin-left: 5rem!important;
}
</style>
