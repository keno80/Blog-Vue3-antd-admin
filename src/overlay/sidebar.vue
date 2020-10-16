<template>
  <a-layout-sider collapsible v-model:collapsed="collapsed" theme="light">
    <div class="logo"/>
    <a-menu theme="light" v-model:selectedKeys="selectedKeys" mode="inline" style="height: 100%">
      <a-menu-item key="1" @click="routerTo">
        <pie-chart-outlined/>
        <span>博客详情</span>
      </a-menu-item>
      <a-menu-item key="2" @click="routerTo">
        <book-outlined/>
        <span>文章列表</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {PieChartOutlined, UserOutlined, BookOutlined} from '@ant-design/icons-vue';
import {reactive, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'

export default {
  name: "sidebar",
  components: {
    PieChartOutlined,
    UserOutlined,
    BookOutlined
  },
  setup() {
    const router = useRouter()

    const state = reactive({
      collapsed: false,
      selectedKeys: ['1']
    })

    function routerTo(item) {
      switch (item.key) {
        case '1':
          router.push({
            path: '/'
          })
          break;
        case '2':
          router.push({
            path: '/article/list'
          })
          break
      }
    }

    const refState = toRefs(state)
    return {
      ...refState,
      routerTo
    }
  },
  mounted() {
    const route = useRoute()
    if (route.path.indexOf('article') === 1) {
      this.selectedKeys = ['2']
    }
  },
}
</script>

<style scoped lang="scss">
</style>