import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    error: null, 
  }),
  actions: {
    async login(elderAccount, elderPwd) {
        console.log("스토어로 전달된 아이디:", elderAccount);
        console.log("스토어로 전달된 비밀번호:", elderPwd);
      
      try {
        const response = await axios.post('http://localhost:8080/api/elders/login', {
          elderAccount,
          elderPwd,
        });
        console.log('백엔드 응답:', response.data); // 응답 데이터 확인

        if (response.data.success === "true") {
          this.isLoggedIn = true;
          this.userId = response.data.response.data;
          this.error = null;
        } else {
          this.isLoggedIn = false;
          this.error = "로그인 실패";
        }
      } catch (error) {
        this.isLoggedIn = false;
        this.error = error.response?.data?.message || '서버 오류가 발생했습니다.';
        this.userId = null;
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.userId = null;
    },
  },
});

