<template>
  <div>
    <!-- Thanh menu -->
    <div class="header">
      <v-toolbar prominent class="full-width">
        <div>
          <img src="/src/assets/logo/logologin.png" alt="" style="cursor: pointer"
          @click="navigateToHome" />
        </div>

        <v-toolbar-title style="cursor: pointer" @click="navigateToHome">Quản Lý Thư Viện</v-toolbar-title>
        <router-link
          v-for="(item, index) in filteredItems"
          :key="index"
          :to="item.to"
          class="menu-item"
        >
          <v-btn text>
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </router-link>

        <!-- Sử dụng <router-link> thay vì @click -->
        <router-link
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          class="menu-item"
        >
          <v-btn text>
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </router-link>

        <v-btn icon @click="openLogoutDialog">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <v-dialog v-model="logoutDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Xác nhận đăng xuất</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="logoutDialog = false">Hủy</v-btn>
          <v-btn text color="red" @click="logout">Đăng xuất</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
  
<script>


export default {
  data() {
    return {
      items: [
      {
          title: "Trang Chủ",
          icon: "mdi-home",
          to: "/home",
        },
        {
          title: "Tra cứu & Tìm kiếm",
          icon: "mdi-magnify",
          to: "/tracuutimkiem",
        },
        { title: "Quản lý sách", icon: "mdi-book", to: "/Quanlysach" },
        { title: "Mượn sách", icon: "mdi-library", to: "/muonsach" },
        {
          title: "Thông Tin Tài Khoản",
          icon: "mdi-account-circle",
          to: "/quanlytaikhoan",
        },
      ],
      userRole: null,
      logoutDialog: false, // Kiểm tra trạng thái dialog đăng xuất
    };
  },

  created() {
    // Lấy vai trò người dùng từ localStorage
    this.userRole = localStorage.getItem("userRole");
  },
  methods: {
    openLogoutDialog() {
      // Mở dialog khi nhấn vào icon đăng xuất
      this.logoutDialog = true;
    },
    logout() {
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem("loggedInAccount");
      localStorage.removeItem("userRole");

      // Đóng dialog và thực hiện hành động đăng xuất (ví dụ: chuyển hướng về trang đăng nhập)
      this.logoutDialog = false;
      this.$router.push("/login"); // Chuyển hướng về trang đăng nhập
      alert("Đăng xuất thành công!");
    },
    navigateToHome() {
      this.$router.push("/docgia"); // Điều hướng về trang chủ
    },
  },
};
</script>

  
  <style scoped>
.full-width {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header {
  margin: 0;
  padding: 0;
}

body {
  padding-top: 64px;
}

.search-bar {
  width: 400px;
  margin: 0 auto;
  border-radius: 50px;
  margin-right: 50px;
}

.menu-item {
  margin-left: 16px;
}

img {
  width: 50px;
  margin: 30px;
}

.content {
  margin-top: 120px;
  padding: 20px;
}
/* Đảm bảo rằng thanh menu chiếm toàn bộ chiều rộng */
.full-width {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* Giảm kích thước logo và padding cho các thiết bị di động */
img {
  width: 40px;
  margin: 16px;
}

/* Căn chỉnh menu items */
.menu-item {
  margin-left: 16px;
}

/* Điều chỉnh lại khoảng cách cho phần content */
.content {
  margin-top: 120px;
  padding: 20px;
}

/* Media Queries cho các thiết bị di động */
@media (max-width: 600px) {
  /* Giảm kích thước logo và khoảng cách trong menu */
  img {
    width: 35px;
    margin: 16px;
  }

  /* Điều chỉnh thanh menu để không bị tràn trên các màn hình nhỏ */
  .header {
    padding: 8px 16px;
  }

  /* Giảm kích thước font title của toolbar */
  .v-toolbar-title {
    font-size: 1.2rem;
  }

  /* Cải thiện khoảng cách cho content */
  .content {
    margin-top: 80px;
    padding: 16px;
  }

  /* Tắt một số phần tử menu để giảm sự chật chội */
  .menu-item {
    font-size: 0.9rem;
  }

  /* Giảm kích thước nút và icon */
  .v-btn {
    padding: 8px;
  }

  .v-icon {
    font-size: 1.1rem;
  }
}

/* Media Queries cho các thiết bị có kích thước trung bình (tablet) */
@media (max-width: 1024px) {
  .header {
    padding: 12px 24px;
  }

  .v-toolbar-title {
    font-size: 1.5rem;
  }

  .content {
    margin-top: 100px;
    padding: 20px;
  }

  .menu-item {
    font-size: 1rem;
  }
}

</style>
  