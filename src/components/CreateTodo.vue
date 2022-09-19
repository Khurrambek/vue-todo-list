<script lang="ts">
import { defineComponent, onUnmounted, PropType } from 'vue'
import { Form, Field } from 'vee-validate'

type Editingitem = {
  id: number,
  isEditing: boolean,
  description: string
}

export default defineComponent({
  name: 'CreateTodo',
  data () {
    return {
      description: ''
    }
  },
  components: {
    Form,
    Field
  },
  props: {
    onsubmit: {
      type: Function as any
    },
    editingTodo: {
      type: Object as PropType<Editingitem>,
      required: true
    }
  },

  updated () {
    if (this.editingTodo.isEditing) {
      this.description = this.editingTodo.description
    } else {
      this.description = ''
    }
  }
})
</script>

<template>
    <Form @submit="onsubmit" class="rounded-md bg-white py-4 my-4">
        <Field
          name="description"
          placeholder="Create new task to todo ..."
          class="outline-none"
          v-model="description"
        />
        <button v-show="editingTodo.isEditing" class="bg-blue-500 px-4 py-2 text-white">Edit</button>
    </Form>
</template>
