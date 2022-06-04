<template>
  <div class="point-list-item" style="color: white">
    <router-link :to="{ name: 'profile', params: { username: point.user.username } }">
      {{ point.user.username }}
    </router-link>: 
    
    
    <span v-if="!isEditing">{{ payload.grade }}</span>
    <span v-if="!isEditing">{{ payload.content }}</span>

    <span v-if="isEditing">
      <input type="float" v-model="payload.grade">
      <input type="text" v-model="payload.content">
      <button @click="onUpdate">Update</button> |
      <button @click="switchIsEditing">Cancle</button>
    </span>

    <span v-if="currentUser.username === point.user.username && !isEditing">
      <button @click="switchIsEditing">Edit</button> |
      <button @click="deletePoint(payload)">Delete</button>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PointListItem',
  props: { point: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        moviePk: this.point.movie,
        pointPk: this.point.pk,
        content: this.point.content,
        grade: this.point.grade
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updatePoint', 'deletePoint']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updatePoint(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style> 
</style>