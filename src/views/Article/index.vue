<template>
  <div>
    <div class="search-tool">
      <a-input-search
          class="search-tool-item"
          v-model:value="searchQuery.title"
          placeholder="请输入文章名"
          enter-button="搜索"
          size="default"
          @search="fetchData"
      />
      <a-button type="primary" @click="addArticle">新增文章</a-button>
    </div>
    <div>
      <a-table :columns="columns" :data-source="list" :rowKey="row => row.article_id" :loading="articleLoading">
        <template v-slot:type="{text: type}">
          <a-tag
              :color="type === 'Vue笔记' ? 'volcano' : type === 'Node.Js笔记' ? 'orange' : 'green'"
          >
            {{ type }}
          </a-tag>
        </template>
        <template v-slot:tags="{text: tags}">
          <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'Vue' ? 'cyan' : tag === 'Node' ? 'pink' : tag === 'React' ? 'orange' : 'green'"
          >
            {{ tag }}
          </a-tag>
        </template>
        <template v-slot:isTop="{text: isTop}">
          <a-tag
              :color="isTop === 0 ? 'orange' : 'green'"
          >
            <span v-if="isTop === 0">未置顶</span>
            <span v-else-if="isTop === 1">已置顶</span>
          </a-tag>
        </template>
        <template v-slot:action="{ text }">
          <a-button type="primary" v-if="text.isTop === 0" @click="upArticle(text)">置顶</a-button>
          <a-button type="danger" v-else-if="text.isTop === 1" @click="upArticle(text)">去顶</a-button>
          <a-button type="primary" style="margin: 0 8px" @click="editArticle(text)">编辑</a-button>
          <a-button type="danger" @click="deleteArticle(text.article_id)">删除</a-button>
        </template>
      </a-table>
    </div>

    <md-editor :visible="editorVisible" @add="add" @closeModal="addArticle" :loading="editorLoading" @edit="edit"
               :editArticle="article" v-if="editorVisible"/>
  </div>
</template>

<script>
import {reactive, toRefs, ref, createVNode} from 'vue'
import articleApi from "../../api/article";
import MdEditor from "@/components/MdEditor";
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
import {Modal} from 'ant-design-vue'

export default {
  name: "index",
  components: {
    MdEditor
  },
  setup(props, ctx) {
    const data = reactive({
      columns: [
        {
          title: '文章ID',
          dataIndex: 'article_id',
          key: 'article_id',
          align: 'center',
          width: '80px'
        },
        {
          title: '文章标题',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          width: '200px'
        },
        {
          title: '文章描述',
          dataIndex: 'description',
          key: 'description',
          align: 'center'
        },
        {
          title: '已看次数',
          dataIndex: 'view_people',
          key: 'view_people',
          align: 'center',
          width: '100px'
        },
        {
          title: '文章分类',
          dataIndex: 'type',
          key: 'type',
          slots: {customRender: 'type'},
          align: 'center'
        },
        {
          title: '文章标签',
          dataIndex: 'tags',
          key: 'tags',
          slots: {customRender: 'tags'},
          align: 'center',
          width: '160px'
        },
        {
          title: '是否置顶',
          dataIndex: 'isTop',
          key: 'isTop',
          slots: {customRender: 'isTop'},
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align: 'center',
          width: '160px'
        },
        {
          title: '操作',
          key: 'action',
          slots: {customRender: 'action'},
          align: 'center',
          width: '240px'
        }
      ],
      list: [],
      articleLoading: false,
      page: 1,
      size: 10,
      searchQuery: {
        title: '',
        type: ''
      },
      article: {}
    })

    function fetchData() {
      data.articleLoading = true
      articleApi.articleList(data.page, data.size, data.searchQuery).then(res => {
        data.articleLoading = false
        data.list = res.data.data
        console.log(res);
      })
    }

    const editorVisible = ref(false)
    const editorLoading = ref(false)

    function addArticle() {
      data.article = {}
      editorVisible.value = !editorVisible.value
    }

    function add(val) {
      editorLoading.value = true
      articleApi.newArticle(val).then(res => {
        if (res.data.code === 200) {
          editorLoading.value = false
          editorVisible.value = false
          fetchData()
        } else {
          editorLoading.value = false
        }
      })
    }

    function editArticle(article) {
      data.article = article
      editorVisible.value = !editorVisible.value
    }

    function edit(val) {
      editorLoading.value = true
      articleApi.editArticle(val).then(res => {
        if (res.data.code === 200) {
          editorLoading.value = false
          editorVisible.value = false
          fetchData()
        } else {
          editorLoading.value = false
        }
      })
    }

    const confirm = Modal.confirm

    function deleteArticle(id) {
      confirm({
        title: '确定要删除这篇文章吗？',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', {style: 'color:red;'}, '文章删除后不可恢复'),
        okText: '删除',
        cancelText: '取消',
        okType: 'danger',
        onOk() {
          articleApi.delArticle(id).then(res => {
            if (res.data.code === 200) {
              Modal.destroyAll()
              fetchData()
            }
          })
        }
      })
    }

    function upArticle(data) {
      confirm({
        title: '确定要更改文章置顶状态吗？',
        icon: createVNode(ExclamationCircleOutlined),
        okText: '确定',
        cancelText: '取消',
        onOk() {
          articleApi.upArticle(data.article_id, data.isTop).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              Modal.destroyAll()
              fetchData()
            }
          })
        }
      })
    }

    const refData = toRefs(data)
    return {
      ...refData,
      fetchData,
      addArticle,
      editorVisible,
      editorLoading,
      add,
      edit,
      deleteArticle,
      upArticle,
      editArticle
    }
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped>
.search-tool {
  margin-bottom: 20px;
}

.search-tool-item {
  width: 260px;
  margin-right: 10px;
}
</style>