<template>
    <div>
        <!-- <h1>영화를 추천받고 싶으면 'ZiGi!'버튼을 누르세요.</h1> -->
        <!-- <h2 style="color: white">영화 이상형 월드컵 결과를 기반으로하여 새로운 영화를 추천해 드립니다.</h2> -->
        
        <div>
            <h1 class="text-center mt-5">ZiGi 추천 영화</h1>
            
            <ul class="text-center">
                <div class="d-inline-flex col-3" v-for = "resultmovie in resultmovies" :key="resultmovie.id">
                    <router-link 
                        :to="{ name: 'movie', params: {moviePk: resultmovie.id} }">
                        <img :src="'https://image.tmdb.org/t/p/original/' + resultmovie.poster_path" style="height: 20rem;" class="card-img-top" alt="image">
                    </router-link>
                </div>
            </ul>
        </div>
        <div class="text-center">
            <button class="btn btn-lg btn-danger" @click="addmovielist(zigimovies)">ZiGi Movie</button>
        </div>
    </div>


  
</template>

<script>
import { mapActions, mapGetters, mapState} from 'vuex'

export default {
    name: 'ZigiResult',
    computed: {
      ...mapGetters(['zigimovies']),
      ...mapState(['recommendmovies', 'fgenres', 'resultmovies'])
    },

    methods: {
      ...mapActions(['fetchZigiMovies', 'addmovielist'])
    },
    created() {
      this.fetchZigiMovies()
    },
}



</script>

<style>

</style>