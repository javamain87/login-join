<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="title">로그인</h1>
      <div class="input-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" placeholder="이메일을 입력하세요" />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <button @click="login" class="submit-btn">로그인</button>
      <div class="additional-options">
        <a href="#" class="forgot-password">비밀번호를 잊으셨나요?</a>
        <a href="#" class="register">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiUtil from '../../../../common/utils/apiUtils'
import { useCommonStore } from '../../../../stroes/userStores/UserDetailPinia'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref("");
const password = ref("");
const userDetailPinia = useCommonStore();

const login = async () => {
  try {
    const parameterMap = {
      email: email.value,
      password: password.value,
    };

    const response = await apiUtil.post("/api/auth/login", parameterMap, true);
    userDetailPinia.setUserDetail(response.data);
    localStorage.setItem("token", response.headers['authorization']);
    await router.push('/')
    // 여기에 로그인 성공 후 처리 로직 추가 (예: 메인 페이지로 리다이렉트)
  } catch (error) {
    console.error('로그인 실패:', error);
    // 여기에 에러 처리 로직 추가 (예: 에러 메시지 표시)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1rem;
}

.submit-btn:hover {
  background-color: #357abd;
}

.additional-options {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.forgot-password, .register {
  color: #4a90e2;
  text-decoration: none;
}

.forgot-password:hover, .register:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
  }
}
</style>