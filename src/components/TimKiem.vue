<template>
  <v-container fluid>
    <v-row justify="center" class="relative-container">
      <v-col>
        <!-- Thanh tìm kiếm -->
        <v-text-field
          v-model="searchText"
          label="Tìm kiếm tài liệu"
          placeholder="Nhập tìm kiếm"
          outlined
          dense
          class="mb-4 search-field"
        ></v-text-field>

        <!-- Bộ lọc trạng thái -->
        <v-select
          v-model="filters.status"
          :items="statusOptions"
          label="Tình trạng"
          item-text="text"
          item-value="value"
          outlined
          dense
          class="mb-4 filter-combobox"
        ></v-select>

        <!-- Danh sách tài liệu -->
        <v-data-table
          :headers="headers"
          :items="filteredDocuments"
          item-key="id"
          class="elevation-1 custom-table"
        >
          <template v-slot:item.actions="{ item }">
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';

export default defineComponent({
  name: "DocumentSearch",
  setup() {
    const documents = reactive<any[]>([
      // Dữ liệu mẫu
      {
        id: 1,
        title: "Sách về lập trình Vue.js",
        author: "Evan You",
        category: "Lập trình",
        publicationYear: 2018,
        status: "available",
        type: "book",
      },
      {
        id: 2,
        title: "Báo cáo tài chính quý 4",
        author: "Nhóm Tài Chính",
        category: "Tài Chính",
        publicationYear: 2023,
        status: "available",
        type: "report",
      },
      // Thêm các tài liệu khác vào đây
    ]);

    const searchText = ref('');
    const filters = reactive({
      status: '',
    });

    const statusOptions = [
      { text: "Còn", value: "available" },
      { text: "Đã mượn", value: "borrowed" },
      { text: "Hư hỏng", value: "damaged" },
    ];

    const headers = ref([
      { text: "Tên Tài Liệu", value: "title", align: "center" },
      { text: "Tác Giả", value: "author", align: "center" },
      { text: "Thể Loại", value: "category", align: "center" },
      { text: "Năm Xuất Bản", value: "publicationYear", align: "center" },
      { text: "Tình Trạng", value: "status", align: "center" },
      { text: "Loại Tài Liệu", value: "type", align: "center" },
      { text: "Hành Động", value: "actions", sortable: false, align: "center" },
    ]);

    const filteredDocuments = computed(() => {
      return documents.filter((document) => {
        const matchesSearch = document.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
                               document.author.toLowerCase().includes(searchText.value.toLowerCase()) ||
                               document.category.toLowerCase().includes(searchText.value.toLowerCase()) ||
                               document.publicationYear.toString().includes(searchText.value);

        const matchesStatus = !filters.status || document.status === filters.status;

        return matchesSearch && matchesStatus;
      });
    });

    const viewDocument = (document: any) => {
      // Hiển thị chi tiết tài liệu
      console.log("Viewing document:", document);
    };

    const downloadDocument = (document: any) => {
      // Tải tài liệu
      console.log("Downloading document:", document);
    };

    return {
      documents,
      searchText,
      filters,
      filteredDocuments,
      statusOptions,
      headers,
      viewDocument,
      downloadDocument,
    };
  },
});
</script>

<style scoped>
.relative-container {
  position: relative;
}

.search-field {
  width: 100%;
}

.filter-combobox {
  width: 200px;
}
</style>
