import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from '../common/utils/commonUtil.js';
import UserLayer from '../service/user/views/layer/UserLayer.vue'
import UserJoin from '../service/user/views/view/UserJoin.vue'
import UserLogin from '../service/user/views/view/UserLogin.vue'
import Main from '../service/main/view/Main.vue'

const routes = [
  {
      path: '/',
      component: Main,
      children: [],
      meta: { requiresAuth: true }
    }, 
    {
      path: '/user',
      component: UserLayer,
      children: [
        {
          path: 'join',
          name: 'UserJoin',
          component: UserJoin
        },
        {
          path: 'login',
          name: 'UserLogin',
          component: UserLogin
        }
      ]
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const { isValid, reason } = await validateToken();
    
    if (!isValid) {
      if (reason === 'expired') {
        // 토큰이 만료된 경우
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
      }
      next('/user/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

  export default router;