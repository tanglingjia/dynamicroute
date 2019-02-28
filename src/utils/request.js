import axios from 'axios'
import { stringify } from 'qs'
import { DevServer } from '../store/const'

const SUCESSCODE = 0

axios.defaults.baseURL = `http://${DevServer}/`
axios.interceptors.response.use(
  response => {
    const { data, config } = response
    const { code, message } = data
    const { params, url } = config
    if (code !== SUCESSCODE) {
      return Promise.resolve({
        url,
        params,
        code,
        message
      })
    }
    return data
  },
  error => {
    return Promise.reject(new Error(error.message))
  }
)

const get = params => {
  const conf = {method: 'GET', timeout: 150 * 1000, responseType: 'json'}
  if (!params.url) {
    alert('Request url is required')
    return {}
  }
  const options = {...conf, ...params}
  const method = options.method.toLowerCase()
  if (method === 'get') {
    options.params = options.data || options.params || {}
  } else if (method === 'post') {
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...options.headers
    }
    options.data = options.data || options.params || {}
    options.data = stringify(params.data, {encodeValuesOnly: true})
  }
  return axios(options).catch(error => {
    console.error('axios catch:', error)
  })
}

const post = params => {
  const conf = {method: 'GET', timeout: 150 * 1000, responseType: 'json'}
  if (!params.url) {
    alert('Request url is required')
    return {}
  }
  const options = {...conf, ...params}
  const method = options.method.toLowerCase()
  if (method === 'get') {
    options.params = options.data || options.params || {}
  } else if (method === 'post' || method === 'put') {
    options.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      ...options.headers
    }
    options.data = options.data || options.params || {}
  }
  return axios(options).catch(error => {
    console.error('axios catch:', error)
  })
}

export {
  axios,
  get,
  post
}
