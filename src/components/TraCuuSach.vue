<template>
  <v-container>
    <v-row>
      <!-- Tìm kiếm theo tên sách -->
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="titleQuery"
          label="Tìm kiếm theo tên sách"
          prepend-icon="mdi-book"
          outlined
        />
      </v-col>

      <!-- Tìm kiếm theo tên tác giả -->
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="authorQuery"
          label="Tìm kiếm theo tác giả"
          prepend-icon="mdi-account"
          outlined
        />
      </v-col>

      <!-- Tìm kiếm theo thể loại -->
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="categoryQuery"
          label="Tìm kiếm theo thể loại"
          prepend-icon="mdi-label"
          outlined
        />
      </v-col>
    </v-row>

    <!-- Danh sách sách dưới dạng các ô -->
    <v-row>
      <v-col
        v-for="book in filteredBooks"
        :key="book.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card>
          <v-img
            :src="book.image"
            alt="Book image"
            height="200px"
          ></v-img>   
          <v-card-text>
            <div><strong>Tên Sách:</strong> {{ book.title }}</div>
            <div><strong>Tác Giả:</strong> {{ book.author }}</div>
            <div><strong>Thể Loại:</strong> {{ book.category }}</div>
            <div><strong>Năm Xuất Bản:</strong> {{ book.publicationYear }}</div>
          </v-card-text>
          <v-card-actions>
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  name: "SearchBooks",
  setup() {
    const books = ref<any[]>([]);

    const titleQuery = ref("");
    const authorQuery = ref("");
    const categoryQuery = ref("");

    const loadBooks = () => {
      const storedBooks = localStorage.getItem("books");
      books.value = storedBooks ? JSON.parse(storedBooks) : [];
    };

    onMounted(() => {
      loadBooks();
    });

    const filteredBooks = computed(() =>
      books.value.filter((book) => {
        const titleMatch = book.title
          .toLowerCase()
          .includes(titleQuery.value.toLowerCase());
        const authorMatch = book.author
          .toLowerCase()
          .includes(authorQuery.value.toLowerCase());
        const categoryMatch = book.category
          .toLowerCase()
          .includes(categoryQuery.value.toLowerCase());
        return titleMatch || authorMatch || categoryMatch;
      })
    );

    const deleteBook = (book: any) => {
      const index = books.value.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.value.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books.value));
      }
    };

    const editBook = (book: any) => {
      // Thực hiện hành động chỉnh sửa sách tại đây
    };

    return {
      titleQuery,
      authorQuery,
      categoryQuery,
      books,
      filteredBooks,
      deleteBook,
      editBook,
    };
  },
});
</script>

<style scoped>
.v-text-field {
  background-color: rgb(254, 255, 255);
  margin-bottom: 20px;
  border-radius: 10px;
  color: black;
}

.v-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  color: #777;
}

.v-card-text {
  font-size: 14px;
}

.v-btn {
  margin-right: 10px;
}
</style>
