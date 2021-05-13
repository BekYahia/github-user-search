import { mutations, state, getters } from '@/store'

describe('Mutations and Getters:', () => {

	it('sleep', () => {
		mutations.set_sleep(state, false)

		expect(state.sleep).toBe(false)
		expect(getters.sleep(state)).toBe(false)
	})

	it('loading', () => {
		mutations.set_loading(state, true)

		expect(state.loading).toBe(true)
		expect(getters.loading(state)).toBe(true)

	})

	it('error', () => {
		mutations.set_error(state, true)

		expect(state.error).toBe(true)
		expect(getters.error(state)).toBe(true)
	})

	it('userCount', () => {
		mutations.set_userCount(state, 3)

		expect(state.userCount).toBe(3)
		expect(getters.userCount(state)).toBe(3)
	})

	it('query', () => {
		mutations.set_query(state, 'Bek')

		expect(state.query).toBe('Bek')
		expect(getters.query(state)).toBe('Bek')
	})

	it('users', () => {
		mutations.set_users(state, [])
		expect(Array.isArray(state.users)).toBe(true)
	})

})