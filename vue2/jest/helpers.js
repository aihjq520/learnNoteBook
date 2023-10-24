import { mount } from '@vue/test-utils'

export function mountComponent(Component, option) {
    return mount(Component, option)
}

export const createTestComp = (template, options = {}) => {
    return {
        template,
        ...options
    }
}
