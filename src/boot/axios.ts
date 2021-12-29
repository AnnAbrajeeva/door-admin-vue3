
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { useRouter } from 'vue-router'
import {Loading, QSpinnerGears} from 'quasar'

interface CommonHeaderProperties extends AxiosRequestConfig {
  Authorization: string;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://doors-api.gigalab.uz' });

api.interceptors.request.use(config => {
  Loading.show({
    delay: 500,
    spinner: QSpinnerGears,
    message: 'Пожалуйста, подождите...'
  });
  const token = localStorage.getItem('token')
  const authorizationToken = token ? `Bearer ${token}` : ''
  config.headers = {Authorization: authorizationToken} as CommonHeaderProperties
  return config
})

api.interceptors.response.use(response => {
  return response;
}, error => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error && error.message === 'Request failed with status code 401') {
    localStorage.removeItem('token');
    const Router = useRouter();
    void Router.push('/auth');
  }

// api.interceptors.response.use(undefined, error => { 
//   if (Loading.isActive) {
//     Loading.hide()
//   }

//   const hasErrResponse = (error as { response: { [key: string]: string } }).response;
//   if(hasErrResponse.status === '401') {
//     localStorage.removeItem('token')
//     const Router = useRouter();
//     console.log('auth')
//     void Router.push('/auth')
//   }
  return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
