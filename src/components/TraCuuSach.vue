<template>
    <v-sheet class="bg-deep pa-16" rounded>
      <v-card class="mx-auto px-10 py-12" max-width="500px">
        <v-card-title>Đặt Lại Mật Khẩu</v-card-title>
        <v-form v-model="form" @submit.prevent="resetPassword">
          <v-text-field
            v-model="newPassword"
            :rules="[required, minLength(6)]"
            label="Mật Khẩu Mới"
            type="password"
            class="mb-4"
            clearable
          ></v-text-field>
  
          <v-text-field
            v-model="confirmPassword"
            :rules="[required, matchPassword]"
            label="Xác Nhận Mật Khẩu"
            type="password"
            class="mb-4"
            clearable
          ></v-text-field>
  
          <v-btn
            :disabled="!form"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
            class="resetpass"
          >
            Cập nhật mật khẩu
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
    
    <script>
  export default {
    data() {
      return {
        form: false,
        newPassword: "",
        confirmPassword: "",
      };
    },
    methods: {
      resetPassword() {
        if (this.newPassword === this.confirmPassword) {
          console.log("Mật khẩu đã được cập nhật thành công!");
          this.$router.push("/login");
        } else {
          console.error("Mật khẩu không khớp!");
        }
      },
      required(v) {
        return !!v || "Vui lòng nhập giá trị này";
      },
      minLength(length) {
        return (v) => (v && v.length >= length) || `Ít nhất ${length} ký tự`;
      },
      matchPassword(v) {
        return v === this.newPassword || "Mật khẩu không khớp";
      },
    },
  };
  </script>
    
  <style scoped>
  /* Căn giữa toàn bộ giao diện */
  .v-sheet {
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
    min-height: 100vh; /* Chiều cao tối thiểu để phủ hết màn hình */
    padding: 0;
    background: transparent;
  }
  
  .v-card {
    width: 100%;
    max-width: 500px; /* Giới hạn chiều rộng của v-card */
    padding: 16px;
  }
  
  .resetpass {
    margin-top: 20px;
  }
  </style>
  
    