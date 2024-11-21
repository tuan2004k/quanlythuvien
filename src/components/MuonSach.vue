<template>
<v-card-text>
  <!-- Chọn Sách -->
  <v-select
    v-model="selectedBook"
    :items="availableBooks"
    item-text="title"
    item-value="id"
    label="Chọn Sách"
    outlined
    required
  ></v-select>

  <!-- Tên Người Mượn -->
  <v-text-field
    v-model="borrowerName"
    label="Tên Người Mượn"
    outlined
    required
  ></v-text-field>

  <!-- Ngày Mượn -->
  <v-text-field
    v-model="borrowDate"
    label="Ngày Mượn"
    type="date"
    outlined
    required
  ></v-text-field>

  <!-- Ngày Hẹn Trả -->
  <v-text-field
    v-model="returnDate"
    label="Ngày Hẹn Trả"
    type="date"
    outlined
    required
  ></v-text-field>
</v-card-text>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "BorrowBookPage",
  setup() {
    const availableBooks = ref<any[]>([]);

    // Dữ liệu mượn sách
    const selectedBook = ref(null);
    const borrowDate = ref("");
    const returnDate = ref("");

    // Lưu phiếu mượn sách
    const borrowedBooks = ref<any[]>(
      JSON.parse(localStorage.getItem("borrowRecords") || "[]")
    );

    // Các header cho bảng hiển thị phiếu mượn
    const headers = [
      { text: "Tên Người Mượn", value: "borrowerName" }, 
      { text: "Tên Sách", value: "title" },
      { text: "Ngày Mượn", value: "borrowDate" },
      { text: "Ngày Hẹn Trả", value: "returnDate" },
      { text: "Trạng Thái", value: "status" },
    ];

    // Lấy danh sách sách từ localStorage khi trang được tải
    onMounted(() => {
      // Lấy tất cả sách từ localStorage
      const allBooks = JSON.parse(
        localStorage.getItem("availableBooks") || "[]"
      );

      // Lọc sách có tình trạng "Đang còn" và chỉ lấy tên sách
      availableBooks.value = allBooks
        .filter((book: { status: string }) => book.status === "Đang còn")
        .map((book: { id: number; title: string }) => ({
          id: book.id,
          title: book.title,
        }));
    });

    // Hàm xử lý khi mượn sách
    const borrowBook = () => {
      if (selectedBook.value && borrowDate.value && returnDate.value) {
        // Tìm tên sách trong availableBooks từ ID sách đã chọn
        const book = availableBooks.value.find(
          (book) => book.id === selectedBook.value
        );

        if (book) {
          const borrowRecord = {
            id: borrowedBooks.value.length + 1, // Tạo ID mới cho mỗi phiếu mượn
            bookId: selectedBook.value,
            title: book.title, // Lấy tên sách từ đối tượng book
            borrowDate: borrowDate.value,
            returnDate: returnDate.value,
            status: "Đang mượn", // Trạng thái sách khi mượn
          };

          // Lưu phiếu mượn vào localStorage
          borrowedBooks.value.push(borrowRecord);
          localStorage.setItem(
            "borrowRecords",
            JSON.stringify(borrowedBooks.value)
          );

          // Hiển thị thông báo thành công
          alert("Mượn sách thành công!");
          clearForm(); // Làm mới form sau khi mượn sách
        } else {
          alert("Sách không tồn tại.");
        }
      } else {
        alert("Vui lòng điền đầy đủ thông tin!");
      }
    };

    // Hàm làm mới form
    const clearForm = () => {
      selectedBook.value = null;
      borrowDate.value = "";
      returnDate.value = "";
    };

    return {
      availableBooks,
      selectedBook,
      borrowDate,
      returnDate,
      borrowedBooks,
      headers,
      borrowBook,
      clearForm,
    };
  },
});
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
