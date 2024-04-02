import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_API

export const axiosInstanceFile = axios.create({
   baseURL: BASE_URL,

   headers: {
      'Content-Type': 'multipart/form-data',
   },
})

let customStore

export const fileInjectStore = (store) => {
   customStore = store
}

axiosInstanceFile.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }

      const { token } = customStore.getState().auth

      if (token) {
         updateConfig.headers.Authorization = `Bearer ${token}`
      }

      return updateConfig
   },

   (error) => {
      return Promise.reject(error)
   }
)

axiosInstanceFile.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },

   (error) => {
      return Promise.reject(error)
   }
)
