<template>
  <div>
    <div class="header">
      <v-toolbar prominent class="full-width">
        <div>
          <img
            src="/src/assets/logo/logologin.png"
            alt=""
            style="cursor: pointer"
            @click="navigateToHome"
          />
        </div>

        <v-toolbar-title style="cursor: pointer" @click="navigateToHome"
          >Quản Lý Thư Viện</v-toolbar-title
        >
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
          <v-btn
          v-for="(item, index) in items"
          :key="index"
          text
          @click="navigateTo(item)"
          class="menu-item"
        >
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
          title: "Trang chủ",
          icon: "mdi-home",
          to: "/home",
        },
        {
          title: "Tra cứu & Tìm kiếm",
          icon: "mdi-magnify",
          to: "/tracuutimkiem",
        },
        { title: "Quản lý sách", icon: "mdi-book", to: "/Quanlysach", requiresRole: "docgia",  },
        { title: "Mượn sách", icon: "mdi-library", to: "/muonsach" },
      
        {
          title: "Thông Tin Tài Khoản",
          icon: "mdi-account-circle",
          to: "/quanlytaikhoan",
        },
      ],
      userRole: null,
      logoutDialog: false,

      
    };
  },
  created() {
    this.userRole = localStorage.getItem("userRole");
  },
  methods: {
    navigateTo(item) {
      // Kiểm tra quyền truy cập
      if (item.requiresRole && item.requiresRole !== this.userRole) {
        alert("Bạn không có quyền truy cập vào trang này!"); // Hiển thị thông báo
        return;
      }
      this.$router.push(item.to); // Điều hướng nếu đủ quyền
    },
    openLogoutDialog() {
      this.logoutDialog = true;
    },
    logout() {
      localStorage.removeItem("loggedInAccount");
      localStorage.removeItem("userRole");
      this.logoutDialog = false;
      this.$router.push("/login");
      alert("Đăng xuất thành công!");
    },
    navigateToHome() {
      this.$router.push("/docgia");
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
</style>
  