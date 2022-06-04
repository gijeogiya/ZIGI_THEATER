<template>
  <div class="review-comment-list">
    
    <ul>
      <review-comment-list-item 
        v-for="reviewcomment in reviewcomments" 
        :reviewcomment="reviewcomment" 
        :key="reviewcomment.pk">
      </review-comment-list-item>        
    </ul>
    <hr>

    <review-comment-list-form></review-comment-list-form>
  </div>
</template>

<script>
import ReviewCommentListItem from '@/components/ReviewCommentListItem.vue'
import ReviewCommentListForm from '@/components/ReviewCommentListForm.vue'
// import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ReviewCommentList',
  components: { ReviewCommentListForm, ReviewCommentListItem },
  props: { reviewcomments: Array },
}
</script>

<style>

</style>