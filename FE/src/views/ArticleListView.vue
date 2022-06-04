<template>
  <div>
    <h1 style="margin-top:4rem;" class="text-center">자유게시판</h1>
    
    <router-link style="margin-left: 5px;" :to="{ name: 'articleNew' }">
      <h4 style="margin-left:2rem;"> >> Create </h4></router-link>
    <hr>
   

    <ul>

      <div style="color:white;" v-for="article in articles" :key="article.pk">
        <!-- 작성자 -->
        {{ article.user.username }}        | 

        <!-- 글 이동 링크 (제목) -->
        <router-link
          :to="{ name: 'article', params: {articlePk: article.pk} }">
          {{ article.title }}
        </router-link>

        <!-- 댓글 개수/좋아요 개수 -->
        
        ({{ article.comment_count }}) 
        <hr style="color:white; height:5px;">

      </div>
    </ul>
   
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ArticleList',
    computed: {
      ...mapGetters(['articles'])
    },
    methods: {
      ...mapActions(['fetchArticles'])
    },
    
    created() {
      this.fetchArticles()
    },
  }
</script>

<style>
li {
  color:white;
}
div {
  background-color: black;
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
