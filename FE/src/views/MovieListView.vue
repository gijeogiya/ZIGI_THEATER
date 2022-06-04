<template>
  <div>
    <img style="margin-bottom: 2rem;" class="d-block w-100" src="@/assets/main.jpg" alt="image">
    <ul>
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          <div class="col" v-for="movie in movies" :key="movie.id">
            <router-link 
              :to="{ name: 'movie', params: {moviePk: movie.id} }">
              <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" class="card-img-top" alt="image">
            </router-link>
          </div>
        </div>
      </div>
    </ul>
   
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'MovieList',
    computed: {
      ...mapGetters(['movies']),
    },
    
    methods: {
      ...mapActions(['fetchMovies'])
    },
    created() {
      this.fetchMovies()
    },
  }
</script>

<style>
  div {
     background-color: black;
     text-decoration-color: white;
}
.row {
    --bs-gutter-x: 0px;
    --bs-gutter-y: 0;
}

</style>
