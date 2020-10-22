<template>
  <div>
    <a-modal v-model:visible="visible" title="文章编辑器" @ok="doRequest" @cancel="closeModal" width="1200px"
             okText="确定" cancelText="取消" :confirm-loading="loading">
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
      <v-md-editor v-model="newArticle.content" height="400px" :disabled-menus="[]"
                   @upload-image="handleUploadImage"></v-md-editor>
    </a-modal>
  </div>
</template>

<script>
import {reactive, toRefs, onBeforeUnmount, ref} from 'vue'
import articleApi from "@/api/article";

export default {
  name: "MdEditor",
  props: {
    editArticle: Object,
    visible: {
      type: Boolean,
      required: true,
      default: false
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

    data.newArticle = {...props.editArticle}
    const apiOption = ref('new')
    props.editArticle.tags ? data.originTags = props.editArticle.tags : data.originTags = []
    Object.keys(props.editArticle).length > 0 ? apiOption.value = 'edit' : apiOption.value = 'new'

    function doRequest() {
      data.newArticle.tags = JSON.stringify(data.originTags)
      apiOption.value === 'new' ? context.emit('add', data.newArticle) : context.emit('edit', data.newArticle)
    }

    function closeModal() {
      context.emit('closeModal')
    }

    function handleUploadImage(event, insertImage,files) {
      const formData = new FormData()
      formData.append('file', files[0])
      articleApi.articleImageUpload(formData).then(res => {
        if (res.data.code === 200) {
          insertImage({
            url: res.data.data.fileUrl
          })
        }
        console.log(res);
      })
    }

    onBeforeUnmount(() => {
      data.newArticle = {
        title: '',
        description: '',
        type: '',
        tags: [],
        content: '',
        introduce: '',
        isTop: 0
      }
    })

    const refData = toRefs(data)
    return {
      ...refData,
      doRequest,
      closeModal,
      handleUploadImage
    }
  },
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