// // // eslint-disable-next-line @typescript-eslint/no-unused-vars
// // import { useStore } from '../store/index'
// import router from '../router/index'
// import VueRouter from 'vue-router'

// // interface Auth {
// //   isAuthenticated: boolean
// // }

// export default (router) => {
//   console.log(router)
  
//     const store = useStore()
//     const isAuthorized = store.getters.isAuthenticated
//     if (!isAuthorized && !router.urlPath.startsWith('/auth')) {
//       redirect({ path: '/auth' })
//       return
//     }
//   }