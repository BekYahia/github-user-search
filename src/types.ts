export interface State {
	sleep: boolean
	loading: boolean
	error: boolean
	userCount: number
	users: any[]
	query: string
	pageInfo: {
	  startCursor: string
	  endCursor: string
	  hasNextPage: boolean
	  hasPreviousPage: boolean
	}
  }