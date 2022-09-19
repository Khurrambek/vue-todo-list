import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CreateTodo from '../../src/components/CreateTodo.vue'

// CREATE TODO COMPONENTS TEST
describe('CreateTodo.vue', () => {
  it('should render if page content is correct', () => {
    const wrapper = mount(CreateTodo)

    expect(wrapper).toBeCalled()
  })
})
