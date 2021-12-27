<template>
  <app-services></app-services>
</template>

<script>
import services from '../components/Services.vue'

  export default {
    name: 'Services',

    components: {
      appServices : services,
    },
  }
</script>
