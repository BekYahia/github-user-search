<template>
	<div class="container">
		<header>
			<SearchForm />
		</header>
		<main>
			<MySuspense>
				<template #sleep>
					<img class="octocat" :src="require('@/assets/octocat.jpg')" alt="Github Icon" />
				</template>
				<template #feedback>
					<MyCard />
				</template>
				<template #default>
					<MyCardSkeleton />
				</template>
				<template #error>
					Sorry, Something went wrong!, is it the Github API or you Internet 🤔
				</template>
			</MySuspense>
		</main>
		<footer>
			<Pagination />
		</footer>
	</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import SearchForm from '@/components/SearchForm.vue'
import MySuspense from '@/components/MySuspense.vue'
import MyCard from '@/components/MyCard.vue'
import MyCardSkeleton from '@/components/MyCardSkeleton.vue'
import '@/assets/focus-visible.min'

export default defineComponent({

	components: {
		Pagination,
		MySuspense,
		MyCard,
		SearchForm,
		MyCardSkeleton
	},
 
	data() {
		return {
			query: '',
		}
	},

	computed: {
		...mapGetters(['userCount', 'pageInfo', 'sleep', 'error', 'loading'])
	}
})
</script>


<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
body { margin: 0 }
.js-focus-visible :focus:not(.focus-visible) {
  outline: none !important;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
	max-width: 1000px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1rem;
	padding-right: 1rem;
	margin-top: 80px;
	color: #555;
	text-align: left;
	main {
		margin-top: 20px;
		display: flex;
		flex-flow: wrap;
		img.octocat {
			width: 450px;
			margin: 40px auto 0
		}
	}
	footer { font-size: 0.8rem }
}
</style>