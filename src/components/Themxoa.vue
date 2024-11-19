<template>
  <v-sheet class="pa-16">
    <v-card class="mx-auto px-10 py-12" max-width="500px">
      <v-card-title>{{ book.id ? 'Chỉnh Sửa Sách' : 'Thêm Sách' }}</v-card-title>
      <v-form
        v-model="form"
        @submit.prevent="save"
      >
        <v-text-field
          v-model="formData.name"
          :rules="[required]"
          label="Tên Sách"
          class="mb-4"
          clearable
        ></v-text-field>
        
        <v-text-field
          v-model="formData.author"
          :rules="[required]"
          label="Tác Giả"
          class="mb-4"
          clearable
        ></v-text-field>
        
        <v-text-field
          v-model="formData.year"
          :rules="[required]"
          label="Năm Xuất Bản"
          type="number"
          class="mb-4"
          clearable
        ></v-text-field>
        
        <v-text-field
          v-model="formData.genre"
          :rules="[required]"
          label="Thể Loại"
          class="mb-4"
          clearable
        ></v-text-field>
        
        <v-btn
          :disabled="!form"
          color="success"
          size="large"
          type="submit"
          block
        >
          Lưu
        </v-btn>
        <v-btn
          color="grey"
          size="large"
          class="mt-2"
          @click="$emit('cancel')"
          block
        >
          Hủy
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
  <v-app>
    <v-sheet class="bg-deep pa-16" rounded>
      <v-card class="mx-auto px-10 py-12" max-width="800px">
        <v-card-title>Quản Lý Sách</v-card-title>
        <v-list>
          <v-list-item v-for="book in books" :key="book.id">
            <v-list-item-content>
              <v-list-item-title>v{{ book.name }}</v-list-item-title>
              <v-list-item-subtitle>v{{ book.author }} ({{ book.year }}) - v{{ book.genre }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="editBook(book)"><v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn icon @click="deleteBook(book.id)"><v-icon>mdi-delete</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-btn @click="showForm = true" color="primary" class="mt-4">Thêm Sách</v-btn>
        <BookForm v-if="showForm" :book="selectedBook" @save="saveBook" @cancel="showForm = false"/>
      </v-card>
    </v-sheet>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: ['book'],
  setup(props, { emit }) {
    const form = ref(false);
    const formData = ref({
      name: '',
      author: '',
      year: '',
      genre: ''
    });

    watch(props.book, (newBook) => {
      if (newBook) {
        formData.value = { ...newBook };
      } else {
        formData.value = { name: '', author: '', year: '', genre: '' };
      }
    });

    const required = (v) => !!v || 'Vui lòng nhập giá trị này';

    const save = () => {
      emit('save', { ...formData.value });
    };

    return { form, formData, save, required };
    {
    const books = ref([
      { id: 1, name: 'Book 1', author: 'Author 1', year: 2021, genre: 'Tiểu thuyết' },
      { id: 2, name: 'Book 2', author: 'Author 2', year: 2022, genre: 'Phi hư cấu' },
    ]);
    const showForm = ref(false);
    const selectedBook = ref(null);

    const editBook = (book) => {
      selectedBook.value = { ...book };
      showForm.value = true;
    };

    const deleteBook = (id) => {
      books.value = books.value.filter(book => book.id !== id);
    };

    const saveBook = (book) => {
      if (book.id) {
        const index = books.value.findIndex(b => b.id === book.id);
        books.value[index] = book;
      } else {
        book.id = Date.now();
        books.value.push(book);
      }
      showForm.value = false;
    };

    return { books, showForm, selectedBook, editBook, deleteBook, saveBook };
  }
  }  
};

</script>


