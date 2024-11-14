<template>
    <v-sheet class="bg-deep pa-16" rounded>
      <v-card class="mx-auto px-10 py-12" max-width="500px">
        <div class="logo-container">
          <img src="/src/assets/logo/logologin.png" alt="logo">
        </div>
        <v-form v-model="form" @submit.prevent="submitRegistrationForm">

          <v-text-field
            v-model="name"
            :readonly="loading"
            :rules="[required]"
            class="mb-4"
            label="Tên"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required, emailRule]"
            class="mb-4"
            label="Email"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required, passwordRule]"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            :readonly="loading"
            :rules="[required, confirmPasswordRule]"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            type="password"
            clearable
          ></v-text-field>

          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
          >
            Đăng ký
          </v-btn>

          <v-card-text class="text-center text-blue">
            Already have an account?
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
          @click.prevent="redirectToLogin"
        >
           Log in
        </a>
      </v-card-text> 
        </v-form>
      </v-card>
    </v-sheet>
  </template>
  
  <script>
  import router from '@/router';
  
  export default {
    data() {
      return {
        form: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        loading: false,
        roles: ['Độc giả', 'Thủ thư', 'Quản trị viên'],
      };
    },
  
    methods: {
      submitRegistrationForm() {
        if (this.password !== this.confirmPassword) {
          alert("Mật khẩu và xác nhận mật khẩu không khớp.");
          return;
        }
  
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        };
  
        localStorage.setItem('newUser', JSON.stringify(newUser)); 
        alert("Đăng ký thành công!");
        router.push('/login');
      },
  
      redirectToLogin() {
        console.log("Redirecting to login...");
        router.push('/login');
      },
  
      required(v) {
        return !!v || 'Trường này là bắt buộc';
      },
  
      emailRule(v) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(v) || 'Email không hợp lệ';
      },
  
      passwordRule(v) {
        return v.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự';
      },
  
      confirmPasswordRule(v) {
        return v === this.password || 'Mật khẩu xác nhận không khớp';
      },
    },
  };
  </script>
  
  <style scoped>
  .v-sheet {
    width: 500px;
  }
  
  .v-card {
    max-width: 600px;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  }
  
  img {
    max-width: 100px;
  }
  
  .sign-in-btn {
    display: flex;
    justify-content: center;
    margin: 10px auto 0;
    width: fit-content;
    background: #03f8bf;
  }
  </style>
  