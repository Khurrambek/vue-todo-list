<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoListItem',
  props: {
    description: {
      type: String,
      required: true
    },
    itemId: {
      type: Number,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
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
  },
  data () {
    return {
      complete: this.completed
    }
  },
  methods: {
    toggleCompleted () {
      this.complete = !this.complete
      this.toggleCompletedItem(this.itemId, this.complete)
    }
  }
})

</script>

<template>
    <div class="group relative flex items-center py-4 text-sm border-b">
        <div name="completed" type="checkbox"
            :checked="complete"
            :class="{ 'bg-gradient-to-br from-blue-300 to-purple-400': complete }"
            class="cursor-pointer text-white inline-grid h-5 w-5 shrink-0 place-content-center rounded-full border border-gray-300 transition hover:border-purple-500 focus:outline-none focus:ring focus:ring-purple-500/40"
            @click="toggleCompleted"
        >
            <img
                v-show="complete"
                src="@/assets/check-icon.svg"
                alt="Check icon mark"
                class="h-2 w-2 text-white"
            >
        </div>
        <label for="completed" class="ml-2 text-lg font-semibold" :class="complete && 'line-through text-gray-400 font-medium'">
            {{description}}
        </label>
        <button @click="editItem(itemId, description)" class="text-2xl flex transition-transform invisible items-center align-middle absolute group-hover:visible right-6 top-6 cursor-pointer">
            <img src="../assets/edit.svg" alt="Edit pen icon here" class="w-5 h-5">
        </button>
        <button @click="deleteItem(itemId)" class="text-3xl flex transition-transform invisible items-center align-middle absolute group-hover:visible right-0 top-3">
            &times;
        </button>
    </div>
</template>
