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
      <v-col>
        <!-- Nút Thêm Sách -->
        <v-btn @click="addBook" color="primary" class="add-book-btn" small>
          Thêm Sách
        </v-btn>

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
import { defineComponent, reactive, ref, computed, onMounted } from "vue";

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
          ? book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
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
      currentBook.value = { ...book };
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

      // Save books to localStorage after adding or editing
      localStorage.setItem("books", JSON.stringify(books));

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
  width: 100px; /* Điều chỉnh chiều rộng tại đây */
  z-index: 10;
  height: 40px;
  border-radius: 5px;
}
.search-bar {
  background-color: #ffffff; /* Màu nền mong muốn */
  border-radius: 5px; /* Làm mượt các góc */
  color: black;
}

.search-bar .v-input__control {
  background-color: inherit; /* Áp dụng màu nền từ lớp cha */
  color: #333; /* Màu chữ (tùy chọn) */
}
.v-text-field{}




</style>
