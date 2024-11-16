<template>
  <div>
    <!-- Thanh menu -->
    <div class="header">
      <v-toolbar prominent class="full-width">
        <div>
          <img src="/src/assets/logo/logologin.png" alt="" />
        </div>

        <v-toolbar-title>Quản Lý Thư Viện</v-toolbar-title>

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

        <v-btn icon @click="handleExportClick">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-toolbar>
    </div>

    <!-- Nội dung động (hiển thị các component tùy theo route) -->
    <div class="content">
      <router-view></router-view> <!-- Đây là nơi các trang con sẽ được hiển thị -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Tra cứu & Tìm kiếm", icon: "mdi-magnify", to: "/tra-cuu-tim-kiem" },
        { title: "Quản lý sách", icon: "mdi-book", to: "/quanlysach" },
        { title: "Mượn sách", icon: "mdi-library", to: "/muon-sach" },
        { title: "Tài liệu điện tử", icon: "mdi-file", to: "/tai-lieu-dien-tu" },
      ],
    };
  },
  methods: {
    handleExportClick() {
      console.log("Export clicked!");
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
