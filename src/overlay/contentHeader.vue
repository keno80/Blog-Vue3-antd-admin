<template>
  <a-layout-header style="background: #fff; padding: 0 16px">
    <a-row type="flex" justify="center">
      <a-col :md="22" :xs="0" :sm="0">
        <p class="header_title">后台管理</p>
      </a-col>
      <a-col :md="2" :xs="0" :sm="0" style="text-align: center">
        <BellOutlined style="font-size: 20px;margin-right: 20px"/>
        <a-dropdown v-model="dropDownVisible">
          <a-avatar :size="44" style="margin-top: -6px"
                    src="https://images.pexels.com/photos/4856247/pexels-photo-4856247.jpeg?crop=entropy&cs=srgb&dl=pexels-elijah-o%27donnell-4856247.jpg&fit=crop&fm=jpg&h=945&w=640"/>

          <template v-slot:overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="logout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>

        </a-dropdown>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import {BellOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: "contentHeader",
  components: {
    BellOutlined
  },
  setup() {
    const dropDownVisible = ref(false)

    const router = useRouter()
    function logout() {
      message.success('即将退出登录', 2)
      setTimeout(() => {
        router.replace({
          path: '/login'
        }).then(() => {
          sessionStorage.removeItem('blog_token')
        })
      }, 2000)
    }

    return {
      dropDownVisible,
      logout
    }
  }
}
</script>

<style scoped>
.header_title {
  font-size: 20px;
}
</style>