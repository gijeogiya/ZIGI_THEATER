<template>
  <form @submit.prevent="onSubmit" class="review-comment-list-form">
    <label style= "color: white;" for="reviewcomment">comment: </label>
    <input type="text" id="reviewcomment" v-model="content" required>
    <button>Comment</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewCommentListForm',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['review']),
  },
  methods: {
    ...mapActions(['createReviewComment']),
    onSubmit() {
      this.createReviewComment({ reviewPk: this.review.pk, content: this.content, }),
      this.content = ''
    }
  }
}
</script>

<style>


</style>