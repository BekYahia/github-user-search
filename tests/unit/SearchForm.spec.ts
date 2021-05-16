import SearchForm from '@/components/SearchForm.vue'
import { mount } from '@vue/test-utils'

const commit = jest.fn()
const dispatch = jest.fn()

const factory = (getters: any, data: any) => {
	return mount(SearchForm, {
		global: {
			mocks: {
				$store: {
					getters,
					commit,
					dispatch
				}
			}
		},
		data() {
			return {
				...data 
			}
		}
	})
}

beforeEach(() => {
	jest.clearAllMocks()
})

describe('SearchForm.vue', () => {

	it('disply user count after loading and updating the DOM', () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: false,
				error: false,
				userCount: 0
			},
			{
				query: '',
				updatedDOM: true
			}
		)
		expect(wrapper.find('span[data-test=user-count]').text().trim()).toBe('0 User')
	})

	it('hide user count while loading', () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: true,
				error: false,
				userCount: 5
			},
			{
				query: '',
				updatedDOM: false
			}
		)
		expect(wrapper.find('span[data-test=user-count]').exists()).toBeFalsy()
	})

	it('hide user count when we have an error', () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: false,
				error: true,
				userCount: 5
			},
			{
				query: '',
				updatedDOM: false
			}
		)
		expect(wrapper.find('span[data-test=user-count]').exists()).toBeFalsy()
	})

	it('hide user count while updating the DOM', () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: false,
				error: false,
				userCount: 5
			},
			{
				query: '',
				updatedDOM: false
			}
		)
		expect(wrapper.find('span[data-test=user-count]').exists()).toBeFalsy()
	})

	it('Perform search: rest current page and dispatch search', async () => {
		const wrapper = factory(
			{
				sleep: false,
				loading: false,
				error: false,
				userCount: 5
			},
			{
				query: 'bek',
				updatedDOM: false
			}
		)
		
		await wrapper.find('button').trigger('click')

		expect(commit).toHaveBeenCalledWith('set_currentPage', 'rest')
		expect(dispatch).toHaveBeenCalledWith('search', {
			query: 'bek',
			style: 'first: 51'
		})
	})
})