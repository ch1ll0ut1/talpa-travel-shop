import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../LoginForm.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('LoginForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Mounts properly', () => {
    const form = mount(LoginForm)
    expect(form).toBeTruthy()
    expect(form.text()).toContain('Login')
  })

  it('click the submit button', async () => {
    const form = mount(LoginForm).find('form')
    const spyOnForm = vi.spyOn(form, 'trigger')
    await form.trigger('click')

    expect(spyOnForm).toHaveBeenCalledOnce()
  })

  it('Renders the input value', async () => {
    const input = mount(LoginForm).find('input')

    expect(input.text()).toContain('')
    await input.setValue('jane@doe.com')
    expect(input.element.value).toEqual('jane@doe.com')
  })
})
