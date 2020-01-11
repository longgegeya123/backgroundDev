import Axios from 'axios'
import config from "../config"
import Qs from 'qs'

class HTTP {
  request(params) {
    return new Promise((resolve, reject) => {
      Axios({
        method: params.type || 'get',
        url: config.baseUrl + params.url,
        data: Qs.stringify(params.data),
        headers: {//配置请求头
          Authorization:params.data.token
        }
      }).then((res) => {
        resolve(res)
        console.log(res)
      })
    })
  }
}
export default HTTP
