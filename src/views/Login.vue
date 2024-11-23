<template>
  <v-sheet class="" rounded>
    <v-card class="mx-auto px-10 py-12" max-width="500px">
      <div class="logo-container">
        <img src="/src/assets/logo/logologin.png" alt="logo" />
      </div>
      <v-form v-model="form" @submit.prevent="submitForm">
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
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          type="password"
          clearable
        ></v-text-field>

        <v-select
          v-model="role"
          :items="roles"
          :rules="[required]"
          label="Phân quyền người dùng"
          placeholder="Chọn phân quyền"
          clearable
          class="mb-4"
        ></v-select>

        <v-btn
          :disabled="!form || !role"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Login
        </v-btn>

        <v-btn
          color="primary"
          size="small"
          variant="text"
          class="sign-in-btn"
          @click="redirectToSignIn"
        >
          Sign Up
        </v-btn>

        <div class="forgot-password-link">
          <a @click.prevent="openForgotPasswordDialog" href="#"
            >Forgot Password</a
          >
        </div>
      </v-form>
    </v-card>

    <v-dialog v-model="forgotPasswordDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5"> Khôi phục mật khẩu </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="resetEmail"
            label="Email"
            placeholder="Nhập email để khôi phục mật khẩu"
            :rules="[required, emailRule]"
            clearable
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeForgotPasswordDialog">Hủy</v-btn>
          <v-btn color="primary" text @click="sendResetLink"
            >Gửi liên kết</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      form: false,
      email: "",
      password: "",
      role: "",
      loading: false,
      forgotPasswordDialog: false,
      resetEmail: "",
      roles: ["Độc giả", "Quản trị viên"],
      userRole: "",
    };
  },
  mounted() {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      this.userRole = storedRole;
    }
  },
  methods: {
    submitForm() {
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      const account = accounts.find(
        (acc) => acc.email === this.email && acc.password === this.password
      );

      if (account) {
        if (account.role !== this.role) {
          alert("Vai trò người dùng không khớp!");
          return;
        }

        localStorage.setItem("loggedInAccount", JSON.stringify(account)); 
        localStorage.setItem("userRole", account.role); 

        this.userRole = account.role; 

        alert("Đăng nhập thành công!");

        if (account.role === "Độc giả") {
          router.push("/docgia");
        } else if (account.role === "Quản trị viên") {
          router.push("/admin");
        }
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
    },

    openForgotPasswordDialog() {
      this.forgotPasswordDialog = true;
    },

    closeForgotPasswordDialog() {
      this.forgotPasswordDialog = false;
    },

    sendResetLink() {
      if (this.resetEmail) {
        console.log("Sending reset link to:", this.resetEmail);
        this.closeForgotPasswordDialog();
        alert(
          "Liên kết khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn."
        );
        this.$router.push("/Resetpass");
      } else {
        alert("Vui lòng nhập email hợp lệ.");
      }
    },

    redirectToSignIn() {
      router.push("/register");
    },

    required(v) {
      return !!v || "Field is required";
    },

    emailRule(v) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(v) || "Email không hợp lệ";
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.v-sheet {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: transparent;
}

.v-card {
  max-width: 500px;
  width: 100%;
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
  margin-top: 10px;
}

.forgot-password-link {
  text-align: center;
  margin-top: 8px;
}

.forgot-password-link a {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}

.sign-in-btn {
  display: flex;
  justify-content: center;
  margin: 10px auto 0;
  width: fit-content;
  background: #03f8bf;
}
</style>
