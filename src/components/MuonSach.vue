<template>
  <v-container>
    <v-row>
      <h1 style="color: black">Mượn Sách</h1>
    </v-row>

    <!-- Danh sách sách có thể mượn hoặc trả -->
    <v-row>
      <v-col
        v-for="book in filteredBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img :src="book.image" alt="Book image" height="200px"></v-img>
          <v-card-text>
            <div><strong>Tên Sách:</strong> {{ book.title }}</div>
            <div><strong>Tác Giả:</strong> {{ book.author }}</div>
            <div><strong>Thể Loại:</strong> {{ book.category }}</div>
            <div><strong>Năm Xuất Bản:</strong> {{ book.publicationYear }}</div>
            <div v-if="book.isBorrowed">
              <div style="color: red">Đã mượn</div>
              <div><strong>Thời gian mượn:</strong> {{ book.borrowTime }}</div>
              <div><strong>Ngày trả:</strong> {{ book.returnDate }}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <!-- Nút mượn -->
            <v-btn
              @click="openBorrowDialog(book)"
              color="primary"
              small
              :disabled="book.isBorrowed"
            >
              Mượn
            </v-btn>

            <!-- Nút trả sách -->
            <v-btn
              @click="openReturnDialog(book)"
              color="green"
              small
              :disabled="!book.isBorrowed"
            >
              Trả
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal đăng ký mượn sách -->
    <v-dialog v-model="isDialogVisible" max-width="500px">
      <v-card>
        <v-card-title> Đăng ký mượn sách </v-card-title>
        <v-card-text>
          <v-form ref="borrowForm" v-model="isFormValid">
            <v-text-field
              v-model="borrowerName"
              label="Tên người mượn"
              required
            ></v-text-field>
            <v-text-field
              v-model="borrowDate"
              label="Ngày mượn"
              type="date"
              :min="today"
              required
            ></v-text-field>
         
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isDialogVisible = false" color="grey">Hủy</v-btn>
          <v-btn
            @click="submitBorrowRequest"
            color="primary"
            :disabled="!isFormValid"
            >Mượn</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal đăng ký trả sách -->
    <v-dialog v-model="isReturnDialogVisible" max-width="500px">
      <v-card>
        <v-card-title> Đăng ký trả sách </v-card-title>
        <v-card-text>
          <v-form ref="returnForm" v-model="isReturnFormValid">
            <v-select
              v-model="returnCondition"
              :items="['Còn sử dụng được', 'Hư hỏng']"
              label="Tình trạng sách"
              required
            ></v-select>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isReturnDialogVisible = false" color="grey">Hủy</v-btn>
          <v-btn
            @click="submitReturnRequest"
            color="primary"
            :disabled="!isReturnFormValid"
            >Trả</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  name: "BorrowReturnBooks",
  setup() {
    
    // Lưu trữ danh sách sách trong `localStorage`
    const books = ref<any[]>([]);

    const titleQuery = ref("");
    const authorQuery = ref("");
    const categoryQuery = ref("");

    // Điều khiển việc hiển thị dialog (modal)
    const isDialogVisible = ref(false);
    const isReturnDialogVisible = ref(false); // Mở dialog trả sách
    const borrowerName = ref("");
    const borrowDate = ref("");
    const returnDate = ref(""); // Ngày trả
    const returnCondition = ref(""); // Tình trạng sách
    const returnTime = ref(""); // Thời gian trả
    const isFormValid = ref(false);
    const isReturnFormValid = ref(false); // Điều kiện form trả sách
    const today = new Date().toISOString().substr(0, 10); // Lấy ngày hiện tại

    // Biến lưu trữ sách hiện tại đang mượn
    const currentBook = ref<any>(null);

    // Hàm tải sách từ localStorage
    const loadBooks = () => {
      const storedBooks = localStorage.getItem("books");
      books.value = storedBooks ? JSON.parse(storedBooks) : [];
    };

    // Khi trang được tải, tải danh sách sách từ localStorage
    onMounted(() => {
      loadBooks();
    });

    // Bộ lọc sách theo tên, tác giả hoặc thể loại
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

    // Mở modal đăng ký mượn sách
    const openBorrowDialog = (book: any) => {
      if (!book.isBorrowed) {
        currentBook.value = book; // Lưu sách hiện tại vào state
        isDialogVisible.value = true;
      } else {
        alert("Sách này đã được mượn.");
      }
    };

    // Mở modal trả sách
    const openReturnDialog = (book: any) => {
      if (book.isBorrowed) {
        currentBook.value = book; // Lưu sách hiện tại vào state
        isReturnDialogVisible.value = true;
      } else {
        alert("Sách này chưa được mượn.");
      }
    };

    // Xử lý khi nhấn nút mượn trong form đăng ký
    const submitBorrowRequest = () => {
      if (currentBook.value) {
        currentBook.value.isBorrowed = true; // Cập nhật trạng thái đã mượn
        currentBook.value.borrowTime = new Date().toLocaleString(); // Lưu thời gian mượn
        currentBook.value.returnDate = returnDate.value; // Lưu ngày trả
        currentBook.value.returnTime = ""; // Khởi tạo thời gian trả
        saveBooks(); // Lưu danh sách sách đã cập nhật vào localStorage
        alert(
          `Đã mượn sách: ${currentBook.value.title}, Tên người mượn: ${borrowerName.value}, Ngày mượn: ${borrowDate.value}, Ngày trả dự kiến: ${returnDate.value}`
        );
        isDialogVisible.value = false;
      }
    };

    // Xử lý khi nhấn nút trả sách trong form trả sách
    const submitReturnRequest = () => {
      if (currentBook.value) {
        currentBook.value.isBorrowed = false; // Cập nhật trạng thái sách đã trả
        currentBook.value.returnCondition = returnCondition.value; // Lưu tình trạng sách
        currentBook.value.returnTime = returnTime.value; // Lưu thời gian trả
        saveBooks(); // Lưu danh sách sách đã cập nhật vào localStorage
        alert(
          `Đã trả sách: ${currentBook.value.title}, Tình trạng: ${returnCondition.value}, Thời gian trả: ${returnTime.value}`
        );
        isReturnDialogVisible.value = false;
      }
    };

    // Lưu lại danh sách sách vào localStorage
    const saveBooks = () => {
      localStorage.setItem("books", JSON.stringify(books.value));
    };

    return {
      books,
      titleQuery,
      authorQuery,
      categoryQuery,
      isDialogVisible,
      isReturnDialogVisible,
      borrowerName,
      borrowDate,
      returnDate,
      returnCondition,
      returnTime,
      isFormValid,
      isReturnFormValid,
      today,
      filteredBooks,
      openBorrowDialog,
      openReturnDialog,
      submitBorrowRequest,
      submitReturnRequest,
    };
  },
});
</script>
