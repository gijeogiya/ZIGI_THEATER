<template>
  <div>
    <h1 class="m-4">{{movie.title }}</h1>
    <div class="row"> 
      <img class="col-6" style="width: 24rem; margin: 2rem;" :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" alt="image">
      <div class="col-6" style="margin-top: 3rem;">
        <p>개봉일 : {{movie.release_date}}</p>     
        <p>평점: {{movie.vote_average}}</p>
        <p>{{ movie.overview }}</p>
        <p col-2 v-for="genre in movie.genre_ids" :key="genre.id"># {{genre.name}}</p>
        </div>
      </div>
      
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
 
  export default {
    name: 'MovieDetail',
    components: {  },
    
    data() {
      return {
        moviePk: this.$route.params.moviePk,
      }
    },
    computed: {
        ...mapGetters(['movie']),

    },
    
    methods: {
      ...mapActions([
        'fetchMovie',
      ])
    },
    created() {
      this.fetchMovie(this.moviePk)
    },
  }
</script>

<style>
p {
  color: white;
  padding-bottom: 0rem;
    padding-left: 2rem;
}

h1 {
  color: white;
  padding-bottom: 2rem;
  padding-left: 2rem;
}

</style>
