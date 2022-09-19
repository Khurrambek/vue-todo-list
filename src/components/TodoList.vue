<script lang="ts">
import { Todo } from '@/types/mainTypes'
import { defineComponent, PropType } from 'vue'
import TodoListItem from './TodoListItem.vue'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoListItem
  },
  props: {
    todoItems: {
      type: Array as PropType<Todo[]>
    },
    deleteItem: {
      type: Function,
      required: true
    },
    toggleCompletedItem: {
      type: Function,
      required: true
    },
    editItem: {
      type: Function,
      required: true
    }
  }
})
</script>

<template>
    <section class="bg-white rounded-md shadow-lg px-6">
        <div class="w-[50vh]">
            <TodoListItem
                v-for="(item) in todoItems"
                :key="item.id"
                :description="item.description"
                :deleteItem="deleteItem"
                :toggleCompletedItem="toggleCompletedItem"
                :itemId="item.id"
                :completed="item.completed"
                :editItem="editItem"
            />
        </div>
    </section>
</template>
