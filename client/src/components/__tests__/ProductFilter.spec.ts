import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProductFilter from '../ProductFilter.vue'

vi.mock('@vue/apollo-composable', () => ({
  useQuery: () => ({
    result: {
      value: {
        orders: []
      }
    },
    refetch: () => {}
  }),
  useMutation: () => ({
    mutate: () => {}
  })
}))

describe('ProductFilter', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Mounts properly', () => {
    const element = mount(ProductFilter, { props: { categoryOptions: ['flight'] } })
    expect(element).toBeTruthy()
    expect(element.text()).toContain('flight')
  })

  it('change category filter', async () => {
    const element = mount(ProductFilter, {
      props: { categoryOptions: ['flight', 'hotel'], categoryFilter: 'flight' }
    })
    const select = element.find('select')
    expect(select.element.value).toEqual('flight')

    await select.setValue('hotel')
    expect(select.element.value).toEqual('hotel')
  })

  it('change date filter', async () => {
    const element = mount(ProductFilter, {
      props: { dateOptions: ['2021-01-01', '2021-01-02'], dateFilter: '2021-01-01' }
    })
    const select = element.find<HTMLSelectElement>('select[data-test="date-filter"]')
    expect(select.element.value).toEqual('2021-01-01')

    await select.setValue('2021-01-02')
    expect(select.element.value).toEqual('2021-01-02')
  })
})
