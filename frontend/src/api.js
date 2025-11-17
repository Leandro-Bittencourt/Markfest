import axios from 'axios'

export function createClient(apiBase, token){
  const base = (apiBase === '/' || !apiBase) ? '' : apiBase
  const instance = axios.create({ baseURL: base })
  instance.interceptors.request.use(cfg => {
    if (token) cfg.headers.Authorization = `Bearer ${token}`
    cfg.headers['Content-Type'] = 'application/json'
    return cfg
  })
  return instance
}
