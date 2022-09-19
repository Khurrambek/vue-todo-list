<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilterItems',
  props: ['filterItems'],
  data () {
    return {
      filterAttributes: ['ALL', 'ACTIVE', 'COMPLETED'],
      active: 0
    }
  },
  methods: {
    handleAttributeClick (attr : string) : void {
      this.filterItems(attr)
      this.active = this.filterAttributes.findIndex((value) => value === attr)
    }
  }
})
</script>

<template>
    <div class="group group-hover:cursor-pointer flex justify-around bg-white py-4 rounded-md">
        <div
            v-for="(attr, i) in filterAttributes"
            :key="i"
            @click="handleAttributeClick(attr)"
            class="capitalize cursor-pointer font-medium"
            :class="active === i && 'text-blue-500'"
        >
            {{attr.toLowerCase()}}
        </div>
    </div>
</template>
