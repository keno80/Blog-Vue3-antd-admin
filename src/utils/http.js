import axios from 'axios'

const instance = axios.create({
  timeout: 100000
})

export const baseUrl = 'http://localhost:9090'

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance