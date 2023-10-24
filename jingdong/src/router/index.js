import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  // 访问login页面之前执行
  beforeEnter (to, from, next) {
    // to 指的是即将跳转到的页面 也就是login页面
    // from 指的是上一个页面是哪里
    const { isLogin } = localStorage
    // next() 表示逻辑继续执行
    // 判断当前是否已登录 如果已经登录直接进主页 否则正常进入当前登录页面
    isLogin ? next({ name: 'Home' }) : next()
  }
}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 不管什么路由切换时都会执行该方法
router.beforeEach((to, from, next) => {
  // to 表示到哪去
  // from 表示从哪来
  // 登陆时向localStorage存一下登录状态
  const { isLogin } = localStorage;
  // 如果已登录 或 当前就在登录页 可以执行下一步, 否则 跳去登录页
  (isLogin || to.name === 'Login') ? next() : next({ name: 'Login' })
})

export default router
