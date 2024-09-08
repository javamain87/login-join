<template>
  <div class="main-container">
    <h1>메인 페이지</h1>
    <p>환영합니다! 로그인에 성공하셨습니다.</p>
    <button @click="logout" class="logout-btn">로그아웃</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { removeToken } from '../../../common/utils/commonUtil';

const router = useRouter();

const logout = () => {
  removeToken();
  router.push('/user/login');
};
</script>

<style scoped>
.main-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logout-btn {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.logout-btn:hover {
  background-color: #357abd;
}
</style>