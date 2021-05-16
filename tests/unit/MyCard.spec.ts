import MyCard from '@/components/MyCard.vue'
import MyCardSkeleton from '@/components/MyCardSkeleton.vue'
import { mount } from '@vue/test-utils'

const users = [
	{
		cursor: '',
		node: {
			avatarUrl: 'string',
			bio: 'string',
			company: 'string',
			createdAt: 'string',
			databaseId: 4,
			followers: {totalCount: 5},
			following: {totalCount: 5},
			id: 'string',
			location: 'string',
			login: 'BekYahia',
			name: 'Baker Y.',
			repositories: {totalCount: 2},
			starredRepositories: {totalCount: 4},
			twitterUsername: 'string',
			updatedAt: 'string',
			url: 'string',
			websiteUrl: 'string',
		}
	}
]

const factory = (updatedDOM: any, users: any) => {
	return mount(MyCard, {
		global: {
			mocks: {
				$store: {
					state: {
						users
					}
				}
			}
		},
		data() {
			return {
				updatedDOM
			}
		}
	})
}

describe('MyCard.vue', () => {

	it('disply card skeleton while the DOM is painting/rendering users', () => {
		const wrapper = factory(false, [])
		expect(wrapper.findComponent(MyCardSkeleton).exists()).toBeTruthy()
	})

	it('NOT disply card skeleton AFTER the DOM is DONE painting/rendering users', () => {
		const wrapper = factory(true, [])
		expect(wrapper.findComponent(MyCardSkeleton).exists()).toBeFalsy()
	})

	it('Rendering users', () => {
		const wrapper = factory(true, users)

		expect(wrapper.findAll('.card').length).toBe(1)
		expect(wrapper.find('div[data-test=card] .card-header small[data-test=login]').text().trim()).toBe('@BekYahia')
	})

	it('Nothing to Render, empty users', () => {
		const wrapper = factory(true, [])

		expect(wrapper.findAll('.card').length).toBe(0)
		expect(wrapper.find('div[data-test=card] .card-header small[data-test=login]').exists()).toBeFalsy()
	})

})