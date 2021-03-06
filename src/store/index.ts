import { createStore, Commit } from "vuex";
import { State, SearchPayload, User, PageInfo, CurrentPage } from '@/types'

export const state = {
	sleep: true,
	loading: false,
	error: false,
	userCount: 0.5, // 0.5 instead 0 to force the dom to be updated. userCount always > 0, see SearchForm.vue
	users: [] as User[],
	query: '',
	currentPage: 1,
	pageInfo: {
		startCursor: '',
		endCursor: '',
		hasNextPage: false,
		hasPreviousPage: false
	}
}

export const getters = {
	sleep(state: State) {
		return state.sleep
	},

	loading(state: State) {
		return state.loading
	},
	
	error(state: State) {
		return state.error
	},
	
	userCount(state: State) {
		return state.userCount
	},

	pageInfo(state: State) {
		return state.pageInfo
	},

	query(state: State) {
		return state.query
	},

	currentPage(state: State) {
		return state.currentPage
	},
}


export const mutations = {
	set_sleep(state: State, payload: boolean) {
		return state.sleep = payload
	},

	set_loading(state: State, payload: boolean) {
		return state.loading = payload
	},

	set_error(state: State, payload: boolean) {
		return state.error = payload
	},

	set_userCount(state: State, payload: number) {
		return state.userCount = payload
	},
	
	set_users(state: State, payload: User[] ) {
		return state.users = payload
	},

	set_pageInfo(state: State, page: PageInfo) {
		return state.pageInfo = page
	},

	set_query(state: State, payload: string) {
		return state.query = payload
	},

	set_currentPage(state: State, payload:CurrentPage): number {
		switch (payload) {
			case 'next':
				return state.currentPage++
			case 'prev':
				return state.currentPage--
			case 'rest':
				return state.currentPage = 1
			default:
				return state.currentPage = +payload
		}
	},

}



interface cmt {commit: Commit}
export const actions = {
	/**
	 * Why not GraphQL client?
	 * They're powerfull with awesome features, but in a single query app, simple HTTP request is enough.
	 */
	search({commit}: cmt, {query, style}: SearchPayload) {
		commit('set_loading', true)
		commit('set_error', false)
		commit('set_sleep', false)
		commit('set_query', query)

		fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`
			},
			body: JSON.stringify({
				query:
				`{
					search(query: "${query}", type: USER, ${style}) {
						pageInfo {
							endCursor
							startCursor
							hasNextPage
							hasPreviousPage
						}
						userCount
						edges {
							node {
								... on User {
									id
									login
									name
									location
									bio
									company
									url
									avatarUrl
									twitterUsername
									websiteUrl
									createdAt
									updatedAt
									databaseId
									followers {
										totalCount
									}
									following {
										totalCount
									}
									starredRepositories {
										totalCount
									}
									repositories {
										totalCount
									}
								}
							}
							cursor
						}
					}
				}`
			}),
		})
		 .then(res => {
			res.json()
				.then(r => {
					commit('set_userCount', r.data.search.userCount)
					commit('set_pageInfo', r.data.search.pageInfo)
					commit('set_users', r.data.search.edges)
				})
				.catch(j => {
					console.log({j})
					commit('set_error', true)
				})
		 })
		 .catch(rej => {
			 console.log({rej})
			 commit('set_error', true)
		 })
		 .finally(() => commit('set_loading', false))
	}
}


export default createStore({
	strict: true,
	state,
	getters,
	mutations,
	actions,
});