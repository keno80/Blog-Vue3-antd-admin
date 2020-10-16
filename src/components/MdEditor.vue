<template>
  <div>
    <a-modal v-model:visible="visible" title="文章编辑器" @ok="addNewArticle" width="1200px" okText="添加文章" cancelText="取消添加"
             :confirm-loading="loading">
      <div class="input_style">
        <a-input-group compact>
          <a-button type="primary">
            文章标题
          </a-button>
          <a-input style="width: 92%;" v-model:value="newArticle.title"/>
        </a-input-group>
        <a-input-group compact>
          <a-button type="primary">
            文章描述
          </a-button>
          <a-input style="width: 92%;" v-model:value="newArticle.description"/>
        </a-input-group>

        <!--      分类选择-->
        <a-select
            v-model:value="newArticle.type"
            style="width: 42%"
            placeholder="请选择文章分类"
        >
          <a-select-option v-for="(item, index) in typeOptions" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>

        <!--            标签选择-->
        <a-select
            v-model:value="originTags"
            mode="multiple"
            style="width: 42%;margin-left: 20px; margin-right: 25px"
            placeholder="请选择文章标签"
            @change="tagsChange"
        >
          <a-select-option v-for="(item, index) in tagsOptions" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>

        <!--      是否置顶-->
        <a-radio-group v-model:value="newArticle.isTop" button-style="solid">
          <a-radio-button :value="0">不置顶</a-radio-button>
          <a-radio-button :value="1">置顶</a-radio-button>
        </a-radio-group>
      </div>
      <v-md-editor v-model="newArticle.content" height="400px"></v-md-editor>
    </a-modal>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'

export default {
  name: "MdEditor",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const data = reactive({
      typeOptions: ['Vue笔记', 'Node.Js笔记', '学习随笔'],
      tagsOptions: ['Vue', 'Node', 'React', 'JavaScript'],
      originTags: [],
      newArticle: {
        title: '',
        description: '',
        type: '',
        tags: [],
        content: '',
        introduce: '',
        isTop: 0
      }
    })

    function tagsChange(value) {
      data.newArticle.tags = JSON.stringify(value)
    }

    function addNewArticle() {
      context.emit('add', data.newArticle)
    }

    const refData = toRefs(data)
    return {
      ...refData,
      tagsChange,
      addNewArticle
    }
  }
}
</script>

<style scoped lang="scss">
.input_style {
  margin-bottom: 20px;

  .ant-input-group {
    margin-bottom: 10px;
  }
}
</style>