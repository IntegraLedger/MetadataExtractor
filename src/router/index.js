import Vue from 'vue'
import VueRouter from 'vue-router'
import UploadFile from '../views/UploadFile.vue'
import FormFields from '../views/FormFields.vue'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/upload-file', component: UploadFile },
    { path: '/form-fields', component: FormFields },
    { path: '/*', redirect: '/upload-file' }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/upload-file') {
    if (store.state.document.file === null) {
      return next({ path: '/upload-file' });
    }
  }
  next();
})

export default router
