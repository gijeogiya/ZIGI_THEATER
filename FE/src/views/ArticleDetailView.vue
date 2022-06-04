<template>
  <div>
    <h1 style="color: white; margin-bottom: 0px;">{{ article.title }}</h1>
    <p>작성자: {{ article.user.username }}</p>
    <hr style="color: white; height: 5px;">

    <h5 style="margin: 2rem;">
      {{ article.content }}
    </h5>
    <!-- Article Edit/Delete UI -->
    <div style="margin: 2rem;" v-if="isAuthor">
      <router-link :to="{ name: 'articleEdit', params: { articlePk } }">
        <button>Edit</button>
      </router-link>
      |
      <button @click="deleteArticle(articlePk)">Delete</button>
    </div>

    <hr />
    <!-- Comment UI -->
    <comment-list :comments="article.comments"></comment-list>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CommentList from '@/components/CommentList.vue'



  export default {
    name: 'ArticleDetail',
    components: { CommentList },
    data() {
      return {
        articlePk: this.$route.params.articlePk,
      }
    },
    computed: {
      ...mapGetters(['isAuthor', 'article']),
      likeCount() {
        return this.article.like_users?.length
      }
    },
    methods: {
      ...mapActions([
        'fetchArticle',
        'likeArticle',
        'deleteArticle',
      ])
    },
    created() {
      this.fetchArticle(this.articlePk)
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
</style>
