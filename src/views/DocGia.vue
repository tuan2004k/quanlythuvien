<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="navigateToHome">
        Quản Lý Thư Viện
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="openLogoutDialog">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="menu-item"
            @click="navigateTo(item)"
            style="padding: 25px;"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Nội dung chính -->
    <v-main>
      <div class="content">
        <router-view></router-view>
      </div>
    </v-main>

    <!-- Dialog đăng xuất -->
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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,  
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
        {
          title: "Quản lý sách",
          icon: "mdi-book",
          to: "/Quanlysach",
          requiresRole: "docgia", 
          title: "Mượn sách", icon: "mdi-library", to: "/muonsach",
         },
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
        alert("Bạn không có quyền truy cập vào trang này!"); 
        return;
      }
      this.$router.push(item.to); 
    },
    navigateToHome() {
      this.$router.push("/home"); 
    },
    openLogoutDialog() {
      this.logoutDialog = true;
    },
    logout() {
      localStorage.removeItem("loggedInAccount");
      localStorage.removeItem("userRole");
      this.logoutDialog = false;
      this.$router.push("/login"); // Chuyển hướng về trang đăng nhập
      alert("Đăng xuất thành công!");
    },
  },
};
</script>

<style scoped>
.menu-item {
  margin-left: 16px;
}

.content {
  margin-top: 80px;
  padding: 20px;
  padding-bottom: 50px;
}
</style>
