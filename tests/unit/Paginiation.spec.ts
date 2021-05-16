import Pagination from '@/components/Pagination.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

const  mutations = {
	set_currentPage: jest.fn()
}
const actions = {
	search: jest.fn()
}
const store = createStore({
	mutations,
	actions
})
// store.commit = jest.fn()
// store.dispatch = jest.fn()

const facory = (getters: any) => {
	return mount(Pagination, {
		global: {
			plugins: [store],
			mocks: {
				$store: {
					getters
				}
			}
		}
	})
}
describe('Pagination.vue', () => {

	it('display the pagination after loading', () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: false,
			query: '',
			userCount: 5,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.find('nav').exists()).toBeTruthy()
	})

	it('Hide the pagination while sleeping [on landing page]', () => {
		const wrapper = facory({
			sleep: true,
			loading: false,
			error: false,
			query: '',
			userCount: 5,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.find('nav').exists()).toBeFalsy()
	})

	it('Hide the pagination while loading', () => {
		const wrapper = facory({
			sleep: false,
			loading: true,
			error: false,
			query: '',
			userCount: 5,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.find('nav').exists()).toBeFalsy()
	})

	it('Hide the pagination when we have and error', () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: true,
			query: '',
			userCount: 5,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.find('nav').exists()).toBeFalsy()
	})

	it('clickable [previous / next] when has previous page or next page', async () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: false,
			query: '',
			userCount: 5,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: true,
				hasPreviousPage: true
			},
		})

		expect(wrapper.find('nav a.navigator[data-test=prev]').attributes('tabindex')).toBe("0")
		expect(wrapper.find('nav a.navigator[data-test=next]').attributes('tabindex')).toBe("0")
	})

	it('Unclickable [previous / next] when has no previous page or next page', () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: false,
			query: '',
			userCount: 5,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.find('nav a.navigator[data-test=prev]').attributes('tabindex')).toBe("-1")
		expect(wrapper.find('nav a.navigator[data-test=next]').attributes('tabindex')).toBe("-1")
	})

	it('display multipages when having large user results [e.x. 10 pages when 500 results] ', () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: false,
			query: '',
			userCount: 500,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.findAll('nav a[data-test=page]').length).toBe(10)
	})

	it('display only 20 page when +1000 result', () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: false,
			query: '',
			userCount: 5000,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.findAll('nav a[data-test=page]').length).toBe(20)
	})

	it('no pagination when no user found', () => {
		const wrapper = facory({
			sleep: false,
			loading: false,
			error: false,
			query: '',
			userCount: 0,
			currentPage: 1,
			pageInfo: {
				startCursor: 'string',
				endCursor: 'string',
				hasNextPage: false,
				hasPreviousPage: false
			},
		})
		expect(wrapper.findAll('nav a[data-test=page]').length).toBe(0)
	})
})