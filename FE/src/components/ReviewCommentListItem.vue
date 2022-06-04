<template>
  <div class="review-comment-list-item" style="color: white">
    <router-link :to="{ name: 'profile', params: { username: reviewcomment.user.username } }">
      {{ reviewcomment.user.username }}
    </router-link>: 
    
    <span class="m-3" v-if="!isEditing">{{ payload.content }}</span>

    <span v-if="isEditing">
      <input type="text" v-model="payload.content">
      <button @click="onUpdate">Update</button> |
      <button @click="switchIsEditing">Cancle</button>
    </span>

    <span class="mb-4" v-if="currentUser.username === reviewcomment.user.username && !isEditing">
      <button @click="switchIsEditing">Edit</button>  | 
      <button @click="deleteReviewComment(payload)">Delete</button>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewCommentListItem',
  props: { reviewcomment: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        reviewPk: this.reviewcomment.review,
        reviewcommentPk: this.reviewcomment.pk,
        content: this.reviewcomment.content
      },
      
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateReviewComment', 'deleteReviewComment']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateReviewComment(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style>
</style>