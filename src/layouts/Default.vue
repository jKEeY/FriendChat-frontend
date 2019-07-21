<template>
  <v-app app dark>
    <slot name="drawer"></slot>
    <v-toolbar app>
      <v-toolbar-side-icon>
        <slot name="icon"></slot>
      </v-toolbar-side-icon>
      <v-toolbar-title>People Chat ^_^</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="$router.push({ name: 'rooms' })" flat>
          <v-icon>home</v-icon>
          Все комнаты
        </v-btn>
        <v-btn flat>
          <v-icon>room</v-icon>
          Ваши комнаты
        </v-btn>
        <v-btn flat @click="isOpen = true">
          <v-icon>add</v-icon>
          Добавить комнату
        </v-btn>
        <v-btn flat>
          <v-icon>input</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <add-room-modal :open="isOpen" @submit="submit"></add-room-modal>
      <slot name="content"/>
    </v-content>
  </v-app>
</template>

<script>
import addRoomModal from '@/modals/addRoom';
import { api } from '@/api'

export default {
  name: 'Default',
  components: {
    addRoomModal,
  },
  data() {
    return {
      drawer: false,
      isOpen: false,
    };
  },
  methods: {
    async submit({ name, description, max_size }) {
      try {
        const token = localStorage.getItem('token');
        const result = await api('http://localhost:3000/api/rooms/add', {
          name,
          description,
          max_size
        });
        this.isOpen = result.success;
      } catch(e) {};
    }
  }
}
</script>
