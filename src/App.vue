<template>  
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted : function(){
    this.$store.dispatch('getServices');
  }
};
</script>
