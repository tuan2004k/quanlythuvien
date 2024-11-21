<template>
  <v-container>
    <h1>Danh Sách Sách</h1>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-card-text>
            <p>Tên sách: {{ book.tilte }}</p>
            <p>Tên Tác giả: {{ book.author }}</p>
            <p>Thể loại: {{ book.category }}</p>
            <p>Năm xuất bản: {{ book.publicationYear }}</p>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const books = ref<any[]>([]);

    onMounted(() => {
      const storedBooks = localStorage.getItem("books");
      if (storedBooks) {
        books.value = JSON.parse(storedBooks); // Lấy danh sách sách từ localStorage
      }
    });

    return {
      books,
    };
  },
});
</script>
  
  <style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.v-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-weight: bold;
  font-size: 16px;
}

.v-card-subtitle {
  font-size: 14px;
  color: #888;
}

.v-card-text {
  font-size: 16px;
  text-align: start;
}
</style>
  