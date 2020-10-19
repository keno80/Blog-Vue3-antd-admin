import axios from '../utils/http'
import {baseUrl} from "@/utils/http";

export default {
  userLogin(userInfo) {
    return axios({
      url: `${baseUrl}/user/login`,
      method: 'post',
      data: userInfo
    })
  }
}