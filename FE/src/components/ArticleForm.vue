<template>
  <form style="margin: 2rem" @submit.prevent="onSubmit">
    <div>
      <label style="color: white; margin: 1rem" for="title">Title: </label>
      <input style="width: 20rem" v-model="newArticle.title" type="text" id="title" />
    </div>
    <div>
      <label style="color: white; margin: 0.1rem" for="ontent">Content: </label>
      <textarea style="width: 20rem; height: 30rem;" v-model="newArticle.content" type="text" id="content"></textarea>
    </div>
    <div>
      <button>{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'ArticleForm',
    props: {
      article: Object,
      action: String,
    },
    data() {
      return {
        newArticle: {
          title: this.article.title,
          content: this.article.content,
        }
      }
    },

    methods: {
      ...mapActions(['createArticle', 'updateArticle']),
      onSubmit() {
        if (this.action === 'create') {
          this.createArticle(this.newArticle)
        } else if (this.action === 'update') {
          const payload = {
            pk: this.article.pk,
            ...this.newArticle,
          }
          this.updateArticle(payload)
        }
      },
    },
  }
</script>

<style></style>
