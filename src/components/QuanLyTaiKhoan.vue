<template>
    <div>
      <h1>Quản lý tài khoản</h1>
      <v-card>
        <!-- Avatar -->
        <div style="text-align: center; margin-top: 20px;">
          <v-avatar size="100">
            <img
              :src="avatarUrl "
              alt="Avatar"
            />
          </v-avatar>
        </div>
  
        <!-- Bảng thông tin -->
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="accountInfo"
            class="elevation-1"
            hide-default-footer
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: "Thông tin", value: "label" },
          { text: "Chi tiết", value: "value" },
        ],
        accountInfo: [],
        avatarUrl: "", // Đường dẫn avatar
      };
    },
    created() {
      const userAccount = JSON.parse(localStorage.getItem("loggedInAccount"));
      if (userAccount) {
        this.accountInfo = [
          { label: "Tên", value: userAccount.name || "Không có tên" },
          { label: "Email", value: userAccount.email || "Không có email" },
        ];
  
        // Nếu userAccount có ảnh avatar, gán vào avatarUrl
        this.avatarUrl =
          userAccount.avatar || "/src/assets/avarta.jpeg"; // Avatar mặc định
      }
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .v-data-table {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .v-card {
    max-width: 400px;
    margin: 20px auto;
  }
  </style>
  