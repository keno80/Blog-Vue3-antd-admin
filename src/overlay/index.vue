<template>
  <a-layout id="components-layout" style="min-height: 100vh">
    <sidebar/>
    <app-content/>
  </a-layout>
</template>

<script>
import sidebar from "./sidebar.vue";
import AppContent from './content.vue'

export default {
  name: "index",
  components: {
    sidebar,
    AppContent
  },
}
</script>

<style scoped lang="scss">

</style>