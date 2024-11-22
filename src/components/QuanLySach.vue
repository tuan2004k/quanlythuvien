<template>
  <v-container fluid>
    <v-text-field
      v-model="searchQuery"
      label="Tìm Kiếm Sách"
      prepend-icon="mdi-magnify"
      outlined
      dense
      class="mb-4 search-bar"
    />
    <v-row justify="center" class="relative-container">
      <v-col
        v-for="book in filteredBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <!-- Thẻ sách -->
        <v-card class="book-card" @click="editBook(book)">
          <v-img
            :src="book.image"
            alt="Book image"
            height="200px"
            class="book-image"
          />
          

          <v-card-text>
            <div><strong>Tên Sách:</strong> {{ book.title }}</div>
            <div><strong>Tác Giả:</strong> {{ book.author }}</div>
            <div><strong>Thể Loại:</strong> {{ book.category }}</div>
            <div><strong>Năm Xuất Bản:</strong> {{ book.publicationYear }}</div>
            <div><strong>Tình Trạng:</strong> {{ book.status }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="editBook(book)" color="yellow darken-1" small>
              Sửa
            </v-btn>
            <v-btn @click="deleteBook(book)" color="red" small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Nút Thêm Sách -->
      <v-btn @click="addBook" color="primary" class="add-book-btn" small>
        Thêm Sách
      </v-btn>

      <!-- Select Filter -->
      <v-select
        v-model="filterStatus"
        :items="statusOptions"
        label="Tình trạng"
        item-text="text"
        item-value="value"
        outlined
        dense
        style="background-color: #1867c0"
        class="mb-4 filter-combobox"
      ></v-select>
    </v-row>

    <!-- Dialog Thêm/Sửa Sách -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>{{ isEditMode ? "Sửa Sách" : "Thêm Sách" }}</v-card-title>
        <v-card-text>
          <!-- Form fields for book details -->
          <v-text-field v-model="currentBook.title" label="Tên Sách" required />
          <v-text-field v-model="currentBook.author" label="Tác Giả" required />
          <v-text-field
            v-model="currentBook.category"
            label="Thể Loại"
            required
          />
          <v-text-field
            v-model="currentBook.publicationYear"
            label="Năm Xuất Bản"
            type="number"
            required
          />
          <v-select
            v-model="currentBook.status"
            :items="statusOptions"
            label="Tình Trạng"
            required
          />
          <v-select
            v-model="currentBook.type"
            :items="typeOptions"
            label="Loại Sách"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Hủy</v-btn>
          <v-btn color="primary" @click="saveBook">{{
            isEditMode ? "Cập Nhật" : "Lưu"
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbarVisible" color="green" top>
      {{ snackbarMessage }}
      <v-btn color="white" text @click="snackbarVisible = false">Đóng</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";

export default defineComponent({
  name: "BookManagement",
  setup() {
    const books = reactive<any[]>([]);
    const dialog = ref(false);
    const snackbarVisible = ref(false);
    const snackbarMessage = ref("");
    const currentBook = ref<any>({
      title: "",
      author: "",
      category: "",
      publicationYear: null,
      status: "",
      type: "",
    });
    const isEditMode = ref(false); // Chế độ chỉnh sửa hay thêm mới
    const statusOptions = [
      { text: "Còn Sách", value: "available" },
      { text: "Đã Mượn", value: "borrowed" },
      { text: "Đã Hư", value: "damaged" },
    ];
    const typeOptions = [
      { text: "Mới", value: "new" },
      { text: "Cũ", value: "old" },
    ];

    const filterStatus = ref("text"); // Trạng thái lọc sách
    const searchQuery = ref(""); // Giá trị tìm kiếm

    const filteredBooks = computed(() => {
      return books.filter((book) => {
        const matchesSearch = searchQuery.value
          ? book.title
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.value.toLowerCase())
          : true;

        const matchesStatus = filterStatus.value
          ? book.status === filterStatus.value
          : true;

        return matchesSearch && matchesStatus;
      });
    });

    // Load books from localStorage when component is mounted
    onMounted(() => {
      const storedBooks = localStorage.getItem("books");
      if (storedBooks) {
        books.push(...JSON.parse(storedBooks));
      }
    });

    const addBook = () => {
      currentBook.value = {
        title: "",
        author: "",
        category: "",
        publicationYear: null,
        status: "",
        type: "",
      };
      isEditMode.value = false;
      dialog.value = true;
    };

    const editBook = (book: any) => {
  currentBook.value = { ...book }; // Gán lại toàn bộ thông tin sách, bao gồm cả ID
  isEditMode.value = true;
  dialog.value = true;
};

    const deleteBook = (book: any) => {
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        // Update localStorage after deleting
        localStorage.setItem("books", JSON.stringify(books));
        snackbarMessage.value = "Xóa sách thành công!";
        snackbarVisible.value = true;
      }
    };

    const saveBook = () => {
  if (isEditMode.value) {
    const bookIndex = books.findIndex(
      (book) => book.id === currentBook.value.id
    );
    if (bookIndex !== -1) {
      books[bookIndex] = { ...currentBook.value };
    }
    snackbarMessage.value = "Cập nhật sách thành công!";
  } else {
    books.push({
      ...currentBook.value,
      id: Date.now(),
    });
    snackbarMessage.value = "Thêm sách thành công!";
  }

  localStorage.setItem("books", JSON.stringify(books));
  resetForm();
  snackbarVisible.value = true;
};


    const resetForm = () => {
      currentBook.value = {
        image: "",
        title: "",
        author: "",
        category: "",
        publicationYear: null,
        status: "",
        type: "",
      };
      isEditMode.value = false;
      dialog.value = false;
    };

    return {
      books,
      dialog,
      snackbarVisible,
      snackbarMessage,
      currentBook,
      isEditMode,
      statusOptions,
      typeOptions,
      filterStatus,
      searchQuery,
      filteredBooks,
      addBook,
      editBook,
      deleteBook,
      saveBook,
    };
  },
});
</script>
<style scoped>


.relative-container {
  position: relative;
}

.add-book-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  padding: 6px 12px;
  font-size: 14px;
}

.filter-combobox {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 200px;
  z-index: 10;
}

.search-bar {
  background-color: #ffffff;
  border-radius: 5px;
  color: black;
}

.search-bar .v-input__control {
  background-color: inherit;
  color: #333;
}

.book-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.book-card:hover {
  transform: scale(1.05);
}

.v-card-title,
.v-card-subtitle {
  font-weight: bold;
}

.v-card{
  margin-top:100px;
  text-align: start;
}
</style>
