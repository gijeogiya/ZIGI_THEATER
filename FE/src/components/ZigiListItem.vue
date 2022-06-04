<template>
  <div class="d-inline-flex col-2">
    <img :src="'https://image.tmdb.org/t/p/original/' + zigiMovie.poster_path" style="height:15rem" alt="image">
  </div>
</template>

<script>
export default {
  name: 'ZigiListItem',
  props: {
    'zigiMovie': Object,
  }
}
</script>

<style>

</style>