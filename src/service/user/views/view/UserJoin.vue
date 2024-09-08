<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="title">회원 가입</h1>
      <div class="input-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="user_email" placeholder="이메일을 입력하세요" />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="user_password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div class="input-group">
        <label for="username">사용자 이름</label>
        <input type="text" id="username" v-model="user_name" placeholder="사용자 이름을 입력하세요" />
      </div>
      <button @click="login" class="submit-btn">가입하기</button>
    </div>
  </div>
</template>

<script setup>
import apiUtil from '../../../../common/utils/apiUtils'
import { ref } from 'vue';

const userInfo = ref(null);
const user_email = ref("");
const user_password = ref("");
const user_name = ref("");

const login = async () => {
  try {
    const parameterMap = {
      email: user_email.value,
      password: user_password.value,
      username: user_name.value,
      role: "ROLE_USER"
    };

    const response = await apiUtil.post("/api/auth/join", parameterMap, true);
    userInfo.value = response.data;
    console.log('회원가입 성공:', userInfo.value);
    // 여기에 성공 후 처리 로직 추가 (예: 로그인 페이지로 리다이렉트)
  } catch (error) {
    console.error('회원가입 실패:', error);
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
}

.submit-btn:hover {
  background-color: #357abd;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
  }
}
</style>