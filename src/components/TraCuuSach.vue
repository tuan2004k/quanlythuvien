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

    <v-data-table :headers="headers" :items="filteredBooks" item-key="id" />
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

    const headers = ref([
      { text: "Tên Sách", value: "title", align: "center" },
      { text: "Tác Giả", value: "author", align: "center" },
      { text: "Thể Loại", value: "category", align: "center" },
      { text: "Năm Xuất Bản", value: "publicationYear", align: "center" },
      { text: "Tình Trạng", value: "status", align: "center" },
      { text: "Loại Sách", value: "type", align: "center" },
      { text: "Hành Động", value: "actions", sortable: false, align: "center" },
    ]);

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

    return {
      titleQuery,
      authorQuery,
      categoryQuery,
      books,
      headers,
      filteredBooks,
    };
  },
});
</script>

<style scoped>
/* Không có CSS tùy chỉnh cho màu sắc */
.v-text-field {
  background-color: rgb(254, 255, 255);
  margin-bottom: 20px;
  border-radius: 10px;
  color: black;
}
</style>
