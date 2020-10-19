import axios from '../utils/http'
import {baseUrl} from "@/utils/http";

export default {
  //文章列表
  articleList(page, size, searchQuery) {
    return axios({
      url: `${baseUrl}/article/list/${page}/${size}`,
      method: 'post',
      data: searchQuery
    })
  },

  //新增文章
  newArticle(data) {
    return axios({
      url: `${baseUrl}/article/add`,
      method: 'post',
      data
    })
  },

  //编辑文章
  editArticle(data) {
    return axios({
      url: `${baseUrl}/article/edit`,
      method: 'post',
      data
    })
  },

  //删除文章
  delArticle(id) {
    return axios({
      url: `${baseUrl}/article/delete/${id}`,
      method: 'delete'
    })
  },

  //文章置顶设置
  upArticle(id, isTop) {
    return axios({
      url: `${baseUrl}/article/top/${id}`,
      method: 'put',
      data: {
        isTop
      }
    })
  }
}