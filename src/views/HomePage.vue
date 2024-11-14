<template>
  <div class="header">
    <v-toolbar prominent class="full-width">
      <div>
        <img src="/src/assets/logo/logologin.png" alt="" />
      </div>

      <v-toolbar-title>Quản Lý Thư Viện</v-toolbar-title>

      <!-- Thanh tìm kiếm -->
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchQuery"
        label="Tìm kiếm"
        prepend-inner-icon="mdi-magnify"
        class="search-bar"
        clearable
        hide-details
        dense
        solo
      ></v-text-field>

      <v-btn
        v-for="(item, index) in items"
        :key="index"
        @click="handleItemClick(item)"
        text
        class="menu-item"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <v-btn icon @click="handleExportClick">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Quản lý sách', icon: 'mdi-book' },
        { title: 'Mượn sách', icon: 'mdi-library' },
        { title: 'Cài đặt', icon: 'mdi-settings' },
      ],
      searchQuery: '', 
    };
  },
  methods: {
    handleItemClick(item) {
      console.log('Item clicked:', item.title);
      if (item.title === 'Quản lý sách') {
        this.$router.push('/quanlysach');
      } else if (item.title === 'Mượn sách') {
        this.$router.push('/muon-sach');
      } else if (item.title === 'Cài đặt') {
        this.$router.push('/cai-dat');
      }
    },
    handleExportClick() {
      console.log('Export clicked!');

    }
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
</style>
