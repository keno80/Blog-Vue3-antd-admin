<template>
  <a-layout>
    <content-header/>
    <a-layout-content class="content_style">
      <router-view/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import contentHeader from "./contentHeader.vue";

export default {
  name: "content",
  components: {
    contentHeader
  }
}
</script>

<style scoped>
.content_style {
  padding: 16px;
}
</style>