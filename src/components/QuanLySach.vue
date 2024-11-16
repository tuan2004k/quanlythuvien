<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="10" xl="8">
          <v-row justify="end" class="mt-4">
            <v-col>
              <router-link to="/" class="home-link">
                <v-btn color="secondary" small class="home-btn">
                  Trở Về Trang Chủ
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
  
          <v-btn @click="dialog = true" color="primary" class="add-book-btn" block>
            Thêm Sách
          </v-btn>
  
          <!-- Danh sách sách -->
          <v-data-table :headers="headers" :items="filteredBooks" item-key="id" class="elevation-1 custom-table">
            <template v-slot:item.actions="{ item }">
              <v-btn @click="editBook(item)" color="yellow darken-1" small class="action-btn" style="margin-right: 8px">Sửa</v-btn>
              <v-btn @click="deleteBook(item)" color="red" small class="action-btn">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
  
          <!-- Dialog thêm/sửa sách -->
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>{{ isEditMode ? "Sửa Sách" : "Thêm Sách" }}</v-card-title>
              <v-card-text>
                <v-text-field v-model="currentBook.title" label="Tên Sách" required />
                <v-text-field v-model="currentBook.author" label="Tác Giả" required />
                <v-text-field v-model="currentBook.category" label="Thể Loại" required />
                <v-text-field v-model="currentBook.publicationYear" label="Năm Xuất Bản" type="number" required />
                <v-select
                  v-model="currentBook.status"
                  :items="statusOptions"
                  label="Tình Trạng"
                  item-text="text"
                  item-value="value"
                  required
                />
                <v-select
                  v-model="currentBook.type"
                  :items="typeOptions"
                  label="Loại Sách"
                  item-text="text"
                  item-value="value"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="dialog = false">Hủy</v-btn>
                <v-btn color="primary" @click="saveBook">{{ isEditMode ? "Cập Nhật" : "Lưu" }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar v-model="snackbarVisible" color="red" top>
            {{ snackbarMessage }}
            <v-btn color="white" @click="snackbarVisible = false">Đóng</v-btn>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  

  
  <script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  status: string;
  type: string;
}

export default defineComponent({
  name: "BookManagement",
  data() {
    return {
      books: [] as Book[],
      dialog: false,
      currentBook: {} as Book,
      snackbarVisible: false,
      snackbarMessage: "",
      headers: [
        { text: "Tên Sách", align: "start", key: "title" },
        { text: "Tác Giả", align: "start", key: "author" },
        { text: "Thể Loại", align: "start", key: "category" },
        { text: "Tình Trạng", align: "start", key: "status" },
        { text: "Loại Sách", align: "start", key: "type" },
        { text: "Hành Động", align: "center", key: "actions" },
      ],
      statusOptions: [
        { text: "Còn Sách", value: "available" },
        { text: "Đã Mượn", value: "borrowed" },
        { text: "Hư Hỏng", value: "damaged" },
      ],
      typeOptions: [
        { text: "Mới", value: "new" },
        { text: "Cũ", value: "old" },
        { text: "Sách Điện Tử", value: "ebook" },
      ],
    };
  },
  computed: {
    isEditMode() {
      return this.currentBook.id !== undefined;
    },
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("books", JSON.stringify(this.books));
    },
    addBook() {
      this.currentBook = {
        id: Date.now(),
        title: "",
        author: "",
        category: "",
        publicationYear: 0,
        status: "available", 
        type: "new", 
      };
      this.dialog = true;
    },
    editBook(book: Book) {
      this.currentBook = { ...book };
      this.dialog = true;
    },
    deleteBook(book: Book) {
      const index = this.books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        this.books.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    saveBook() {
      // Kiểm tra tất cả các trường thông tin
      if (
        !this.currentBook.title ||
        !this.currentBook.author ||
        !this.currentBook.category ||
        !this.currentBook.publicationYear ||
        !this.currentBook.status ||
        !this.currentBook.type
      ) {
        this.snackbarMessage = "Vui lòng điền đầy đủ thông tin!";
        this.snackbarVisible = true;
        return;
      }

      if (this.isEditMode) {
        const index = this.books.findIndex((b) => b.id === this.currentBook.id);
        if (index !== -1) {
   
          this.books[index] = { ...this.currentBook };
        }
      } else {
        this.books.push({
          id: Date.now(), 
          ...this.currentBook,
        });
      }

      this.saveToLocalStorage();
      this.dialog = false;
      this.currentBook = {} as Book; 
    },
    loadBooksFromLocalStorage() {
      const savedBooks = localStorage.getItem("books");
      if (savedBooks) {
        try {
          this.books = JSON.parse(savedBooks);
        } catch (e) {
          console.error("Error loading books from localStorage:", e);
        }
      }
    },
  },
  onMounted() {
    this.loadBooksFromLocalStorage();
  },
});
</script>
  
<style scoped>
.action-btn {
  margin-right: 8px;
}

.custom-table th,
.custom-table td {
  padding: 12px 16px;
}

.custom-table .v-btn {
  font-size: 16px;
  padding: 10px 20px;
}

.custom-table .v-btn:hover {
  background-color: #e0e0e0;
}
.home-btn {
  font-size: 14px; 
  padding: 8px 16px;
  width: auto;
  margin-bottom: 16px; 
}
</style>



  