<template>
  <form @submit.prevent="onSubmit" class="point-list-form">
      
    <label style="color: white;" for="point">평점: </label>
    <input type="float" id="point" v-model="grade" required/>
    
    <label style= "color: white;" for="point">댓글: </label>
    <input type="text" id="point" v-model="content" required>

    <button>등록</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PointListForm',
  data() {
    return {
      content: '',
      grade: '',

    }
  },
  computed: {
    ...mapGetters(['movie']),
  },
  methods: {
    ...mapActions(['createPoint']),
    onSubmit() {
      this.createPoint({ moviePk: this.movie.pk, content: this.content, grade: this.grade})
      this.content = ''
      this.grade = ''
    }
  }
}
</script>

<style>
.point-list-form {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
}

</style>