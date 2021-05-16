import MySuspense from '@/components/MySuspense.vue'
import { mount } from '@vue/test-utils'

const factory = (getters: any, slots: any) => {
	return mount(MySuspense, {
		global: {
			mocks: {
				$store: {
					getters
				}
			}
		},
		slots
	})
}


describe('MySuspense.vue', () => {

	it('show sleep slot', () => {
		const wrapper = factory(
			{
				sleep: true,
				loading: false,
				error: false
			},
			{
				sleep: 'sleeping...'
			}
		)
		expect(wrapper.html()).toContain('sleeping...')
	})

	it('show feedback slot', () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: false,
				error: false
			},
			{
				feedback: 'feedback solt is here'
			}
		)
		expect(wrapper.html()).toContain('feedback solt is here')
	})

	it('show loading slot', () => {
		const wrapper = factory(
			{
				sleep: true,
				loading: true,
				error: false
			},
			{
				default: 'loading...'
			}
		)
		expect(wrapper.html()).toContain('loading...')
	})

	it('show error slot', () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: false,
				error: true
			},
			{
				error: 'we have an error...'
			}
		)
		expect(wrapper.html()).toContain('we have an error...')
	})

})