<script lang="ts">
import { defineComponent } from 'vue'
import CreateTodo from './components/CreateTodo.vue'
import TodoList from './components/TodoList.vue'
import { Todo } from '@/types/mainTypes'
import FilterItems from './components/FilterItems.vue'

export default defineComponent({
  name: 'App',
  components: {
    CreateTodo,
    TodoList,
    FilterItems
  },
  data () {
    return {
      todoItems: this.getItemsFromStorage(),
      newTodo: {
        id: 0,
        description: '',
        isEditing: false
      }
    }
  },
  methods: {
    onSubmit (values: Todo, actions : any): void {
      if (this.newTodo.isEditing && values.description) {
        const editingTodo = {
          id: this.newTodo.id,
          description: values.description
        }
        this.editItem(editingTodo)
        return actions.setFieldValue('description', '')
      }

      if (values.description) {
        this.todoItems.unshift({
          description: values.description,
          completed: false,
          id: Date.now()
        })
      }

      if (this.todoItems.length > 0) {
        this.saveToStorage(this.todoItems)
      }

      actions.setFieldValue('description', '')
    },

    saveToStorage (items: Todo[]) {
      localStorage.setItem('items', JSON.stringify(items))
    },

    getItemsFromStorage (): Todo[] | [] {
      return JSON.parse(localStorage.getItem('items') as string)
    },

    getEditingItem (todoId: number, todoDescription: string): void {
      this.newTodo = {
        id: todoId,
        description: todoDescription,
        isEditing: true
      }
    },

    editItem (newTodo: {id: number, description: string}) : void {
      console.log(newTodo)
      const items = this.getItemsFromStorage() || []

      items.forEach((item) => {
        if (item.id === newTodo.id) {
          item.description = newTodo.description
        }
      })

      this.todoItems = items
      this.saveToStorage(items)
      this.newTodo = {
        ...this.newTodo,
        isEditing: false
      }
    },

    deleteItem (itemId: number): void {
      const items = this.todoItems || []

      const filteredItems = items.filter((item : Todo) => item.id !== itemId)
      this.todoItems = filteredItems
      this.saveToStorage(filteredItems)
    },

    toggleCompletedItem (itemId : number, complete : boolean) : void {
      const items = this.getItemsFromStorage()
      items.forEach((item) => {
        if (item.id === itemId) {
          item.completed = complete
        }
      })
      this.todoItems = items
      this.saveToStorage(items)
    },

    filterItems (filterType: string) {
      const items = this.getItemsFromStorage()
      switch (filterType) {
        case 'ACTIVE':
          this.todoItems = items.filter((item: Todo) => item.completed === false)
          break
        case 'COMPLETED':
          this.todoItems = items.filter((item: Todo) => item.completed === true)
          break
        default:
          this.todoItems = items
      }
    }
  }
})
</script>

<template>
  <section class="flex items-center justify-center bg-gray-200">
    <div class="text-center">
      <h3 class="mt-4 text-2xl font-semibold text-blue-500">Todo App</h3>
      <CreateTodo :onSubmit="onSubmit" :editingTodo="newTodo" />
      <TodoList :todoItems="todoItems" :deleteItem="deleteItem" :toggleCompletedItem="toggleCompletedItem" :editItem="getEditingItem" />
      <FilterItems :filterItems="filterItems" />
    </div>
  </section>
</template>
