export interface State {
	sleep: boolean
	loading: boolean
	error: boolean
	userCount: number
	users: User[]
	query: string
	pageInfo: PageInfo
}

export interface PageInfo {
	startCursor: string
	endCursor: string
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export interface SearchPayload {
	query: string
	style: string
}

export interface User {
	cursor: string
	node: UserAttributes
}

interface UserAttributes {
	avatarUrl: string
	bio?: string
	company?: string
	createdAt: string
	databaseId: number
	followers: {totalCount: number}
	following: {totalCount: number}
	id: string
	location?: string
	login: string
	name?: string
	repositories: {totalCount: number}
	starredRepositories: {totalCount: number}
	twitterUsername?: string
	updatedAt: string
	url: string
	websiteUrl?: string
}