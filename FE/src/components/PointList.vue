<template>
  <div class="point-list">
    
  <ul>

    <point-list-item 
        v-for="point in points" 
        :point="point" 
        :key="point.pk">
    </point-list-item>        

  </ul>
   

    <point-list-form></point-list-form>
  </div>
</template>

<script>
import PointListItem from '@/components/PointListItem.vue'
import PointListForm from '@/components/PointListForm.vue'
// import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'PointList',
  components: { PointListForm, PointListItem },
  props: { points: Array },
}
</script>

<style>
.point-list {
  border: 1px solid white;
}
</style>