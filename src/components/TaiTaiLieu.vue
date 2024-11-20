<template>
  <v-container fluid>
    <v-row justify="center" class="relative-container">
      <v-col>
        <!-- Nút Thêm Sách -->
        <v-btn @click="addBook" color="primary" class="add-book-btn" small>
          Thêm Sách
        </v-btn>

        <!-- Nút Tải lên PDF -->
        <v-file-input
          v-model="pdfFile"
          label="Tải lên tài liệu PDF"
          @change="uploadPDF"
          accept=".pdf"
          class="mb-4"
          small
        ></v-file-input>

        <v-select
          v-model="filterStatus"
          :items="statusOptions"
          label="Tình trạng"
          item-text="text"
          item-value="value"
          outlined
          dense
          class="mb-4 filter-combobox"
        ></v-select>

        <v-data-table
          :headers="headers"
          :items="filteredBooks"
          item-key="id"
          class="elevation-1 custom-table"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="editBook(item)"
              color="yellow darken-1"
              small
              class="action-btn"
              style="margin-right: 20px"
            >
              Sửa
            </v-btn>
            <v-btn
              @click="deleteBook(item)"
              color="red"
              small
              class="action-btn"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <!-- Dialog Thêm/Sửa Sách -->
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>{{
              isEditMode ? "Sửa Sách" : "Thêm Sách"
            }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="currentBook.title"
                label="Tên Sách"
                required
              />
              <v-text-field
                v-model="currentBook.author"
                label="Tác Giả"
                required
              />
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
          <v-btn color="white" text @click="snackbarVisible = false"
            >Đóng</v-btn
          >
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";

export default defineComponent({
  name: "BookManagement",
  setup() {
    const books = reactive<any[]>([]);
    const dialog = ref(false);
    const snackbarVisible = ref(false);
    const snackbarMessage = ref("");
    const headers = ref([
      { text: "Tên Sách", value: "title", align: "center" },
      { text: "Tác Giả", value: "author", align: "center" },
      { text: "Thể Loại", value: "category", align: "center" },
      { text: "Năm Xuất Bản", value: "publicationYear", align: "center" },
      { text: "Tình Trạng", value: "status", align: "center" },
      { text: "Loại Sách", value: "type", align: "center" },
      { text: "Hành Động", value: "actions", sortable: false, align: "center" },
    ]);

    const currentBook = ref<any>({
      title: "",
      author: "",
      category: "",
      publicationYear: null,
      status: "",
      type: "",
    });
    const isEditMode = ref(false);
    const statusOptions = [
      { text: "Còn Sách", value: "available" },
      { text: "Đã Mượn", value: "borrowed" },
      { text: "Đã Hư", value: "damaged" },
    ];
    const typeOptions = [
      { text: "Mới", value: "new" },
      { text: "Cũ", value: "old" },
    ];

    const filterStatus = ref('text');

    const filteredBooks = computed(() => {
      if (!filterStatus.value) return books;
      return books.filter((book) => book.status === filterStatus.value);
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
      currentBook.value = { ...book };
      isEditMode.value = true;
      dialog.value = true;
    };

    const deleteBook = (book: any) => {
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
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

      currentBook.value = {
        title: "",
        author: "",
        category: "",
        publicationYear: null,
        status: "",
        type: "",
      };
      isEditMode.value = false;
      dialog.value = false;

      snackbarVisible.value = true;
    };

    const pdfFile = ref<File | null>(null); // Biến lưu file PDF

    const uploadPDF = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        pdfFile.value = target.files[0];
        snackbarMessage.value = "Tải lên tài liệu thành công!";
        snackbarVisible.value = true;

        // Xử lý file PDF ở đây (ví dụ: gửi lên server hoặc đọc nội dung)
        // Ví dụ: bạn có thể đọc file PDF nếu cần
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target?.result; // Nội dung file PDF
          console.log(fileContent); // Bạn có thể xử lý nội dung này theo cách bạn muốn
        };
        reader.readAsArrayBuffer(pdfFile.value);
      }
    };

    return {
      books,
      dialog,
      headers,
      snackbarVisible,
      snackbarMessage,
      currentBook,
      isEditMode,
      statusOptions,
      typeOptions,
      filterStatus,
      filteredBooks,
      addBook,
      editBook,
      deleteBook,
      saveBook,
      pdfFile,
      uploadPDF,
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

.mb-4 {
  margin-bottom: 16px;
}

.filter-combobox {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 200px;
  z-index: 10;
}

.custom-table th,
.custom-table td {
  padding: 12px;
}
.custom-table {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 600px) {
  .custom-table th,
  .custom-table td {
    display: block;
    text-align: left;
  }

  .custom-table th {
    position: sticky;
    top: 0;
    background-color: white;
  }

  .custom-table td {
    position: relative;
    padding: 8px 0;
  }

  .custom-table tbody {
    display: block;
  }
}
.filter-combobox {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 100px;
  z-index: 10;
  height: 40px;
  border-radius: 5px;
}
</style>
