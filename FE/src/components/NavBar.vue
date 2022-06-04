<template>
<div>
  <b-navbar type="dark">
    <b-navbar-brand>
      <router-link 
          :to="{ name: 'movies'}">
           <img style="width: 6rem;" src="@/assets/ZIGI_logo.png" alt="image">
        </router-link> 
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
       
        <b-nav-item-dropdown text="Community">
          <b-dropdown-item style="background-color: black;">
            <router-link style="color: black;" :to="{ name: 'articles' }">자유게시판</router-link>
          </b-dropdown-item > 
          <b-dropdown-item style="background-color: black;" >
            <router-link style="color: black;" :to="{ name: 'reviews' }">리뷰게시판</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item>
          <div v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }">Login</router-link>
          </div>
        </b-nav-item>
        <b-nav-item class="text-decoration:None">
          <div v-if="!isLoggedIn">
            <router-link :to="{ name: 'signup' }">Signup</router-link>
          </div>
        </b-nav-item>
        <b-nav-item>
          <div v-if="isLoggedIn">
            <router-link :to="{ name: 'zigi' }">ZiGi Movie</router-link>
          </div>
        </b-nav-item>
        <b-nav-item>
          <div v-if="isLoggedIn">
            <router-link :to="{ name: 'profile', params: { username } }">
               {{ currentUser.username }}님 
            </router-link>
          </div>
        </b-nav-item>
        <b-nav-item>
          <div v-if="isLoggedIn">
            <router-link :to="{ name: 'logout' }"> Logout </router-link>
          </div>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters (['isLoggedIn', 'currentUser']),
      username() {
        return this.currentUser.username ? this.currentUser.username : 'guest'
      },
    },
  }
</script>

<style>
 .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
}
.navbar-brand {
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    margin-left: 1rem;
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
}
.navbar-collapse {
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
    justify-content: end;
    margin-right: 2rem;
    font-size: 20px;
}
a {
    color: white !important;
    text-decoration: none !important;
  
}


</style>
