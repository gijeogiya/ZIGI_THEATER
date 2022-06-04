<template>
  <div>
    <div id="candidates">
      <ul class="text-center mt-5">
          <zigi-list-item
          v-for="zigiMovie in zigiMovies"
          :key="zigiMovie"
          :zigiMovie="zigiMovie"
          ></zigi-list-item>
      </ul>
      <ul v-if="Object.keys(zigiMovies).length<8">
        <h1 class="text-center" v-if="Object.keys(zigiMovies).length === 0">좋아하는 영화 총 8개를 골라주세요!</h1>
        <h1 class="text-center" v-if="Object.keys(zigiMovies).length > 0">좋아하는 영화 {{ 8 - Object.keys(zigiMovies).length }}개를 더 골라주세요! </h1>
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
              <div class="col" v-for="movie in movies" :key="movie.id">
                <button v-if="movie.release_date" @click="addZigiMovie(movie)" v-on:click="movie.release_date = false">
                  <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" class="card-img-top" alt="image">
                </button>
              </div>
            </div>
          </div>
      </ul>
      <h1 class="text-center" v-if="Object.keys(zigiMovies).length === 8">영화 선택 완료!</h1>
      <h1 class="text-center" v-if="Object.keys(zigiMovies).length === 8">취향 분석을 시작합니다.</h1>
      <div class="text-center" v-if="Object.keys(zigiMovies).length === 8">
        <button class="text-center btn-lg btn-danger"
        onclick="document.getElementById('candidates').style.display='none';"
        @click="addleftright8(zigiMovies)">START</button>
      </div>
    </div>
    

    <h1 class="text-center text-white" v-if="Object.keys(left).length!==0 && Object.keys(right).length!==0">더 좋아하는 영화를 클릭하세요!</h1>
    
      <ul class="d-flex justify-content mt-5">
        <div class="col-6" v-for="leftmovie in left" :key="leftmovie.id">
          <button @click="leftwin()">
            <img :src="'https://image.tmdb.org/t/p/original/' + leftmovie.poster_path" class="card-img-top" style="width:30rem; height:40rem" alt="image">
          </button>
        </div>
        <div class="col-6" v-for="rightmovie in right" :key="rightmovie.id">
          <button @click="rightwin()">
            <img :src="'https://image.tmdb.org/t/p/original/' + rightmovie.poster_path" class="card-img-top" style="width:30rem; height:40rem" alt="image">
          </button>
        </div>
      </ul>
    <div v-if="firstmovie.length === 1" class="text-center">
        <button class="btn btn-lg btn-danger mb-5" @click="makerecommendmovies()">
          <router-link :to="{ name: 'zigiresult' }">영화 추천 받기</router-link>
        </button>
    </div>


    

    
   
  </div>
</template>

<script>
  import ZigiListItem from '@/components/ZigiListItem.vue'

  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: 'ZigiView',
    components: {
        ZigiListItem,
    },
    computed: {
      ...mapGetters(['movies', 'movie']),
      ...mapState(['zigiMovies', 'left', 'right', 'winners4', 'winners2', 'losers4', 'submovies', 'firstmovie', 'secondmovie', 'fgenres', 'recommendmovies']),
    },
    
    methods: {
      ...mapActions(['fetchMovies', 'addZigiMovie', 'addleftright8', 'leftwin', 'rightwin', 'makerecommendmovies'])
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
