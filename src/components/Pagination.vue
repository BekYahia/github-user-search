<template>
	<nav v-if="!loading && !error  && !sleep && userCount" aria-label="Pagination">
		<a
			@click="prev()"
			:class="['navigator', pageInfo.hasPreviousPage ? 'active' : '']"
			:tabindex='pageInfo.hasPreviousPage ? 0 : -1'
		>
			<span aria-hidden="true" v-text="'<<'"></span> Previous
		</a>

		<a
			v-for="page in pages" :key="page"
			@click="goToPage(page)"
			:aria-label="`Page ${page}`"
			:aria-current="currentPage == page ? true : false"
			class="item" tabindex="0" 
		>
			{{ page }}
		</a>

		<a
			@click="next()"
			:class="['navigator', pageInfo.hasNextPage ? 'active' : '']"
			:tabindex='pageInfo.hasNextPage ? 0 : -1'
		>
			Next <span  aria-hidden="true" v-text="'>>'"></span>
		</a>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({

	name: 'Pagination',


	computed: {
		...mapGetters(['userCount', 'pageInfo', 'loading', 'query', 'error', 'currentPage', 'sleep']),

		pages(): number {
			if(!this.userCount) return 0

			//GitHub Search API provides up to 1,000 results for each search
			const newCount:number = this.userCount > 1000 ?  1000 : this.userCount
			return Math.ceil(newCount / 50)
		},
	},

	methods: {
		prev(): void {
			if(!this.pageInfo.hasPreviousPage) return
			
			this.$store.commit('set_currentPage', 'prev')

			this.$store.dispatch('search', {
				query: this.query,
				style: `before: "${this.pageInfo.startCursor}", last: 51`
			})
		},

		next(): void {
			if(!this.pageInfo.hasNextPage) return
			
			this.$store.commit('set_currentPage', 'next')

			this.$store.dispatch('search', {
				query: this.query,
				style: `after: "${this.pageInfo.endCursor}", first: 51`
			})
		},

		goToPage(targetPage: number): void {
			this.$store.commit('set_currentPage', targetPage)

			const itemsPerPage = 49
			const cursor = targetPage * itemsPerPage - itemsPerPage
			const cursorInBase64 = btoa('cursor:'+cursor)

			this.$store.dispatch('search', {
				query: this.query,
				style: `after: "${cursorInBase64}", first: 51`
			})
		}
	}

})
</script>

<style lang="scss" scoped>
nav {
	margin: 20px auto;
	width: fit-content;
	a {
		display: inline-block;
		padding: 3px 7px;
		&.item {
			margin-right: 7px;
			cursor: pointer;
			color: whitesmoke;
			background-color: gray;
			&[aria-current='true'] {
				background-color: deeppink;
			}
		}
		&.navigator {
			color:#777
		}
		&.active {
			cursor: pointer;
			color: #000;
			letter-spacing: 1px;

		}
		&[tabindex="-1"] {
			outline: none;
		}
	}
}
</style>