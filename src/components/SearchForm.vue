<template>
	<h1>Search more than 70M users</h1>
	<form>
		<label>
			<span class="sr-only">Search github users</span>
			<input v-model.lazy="query" type="text" data-test="search-input" autofocus autocomplete="off" placeholder="Search Github User" />
		</label>
		<button type="submit" @click.prevent="search()">Search</button>
	</form>
	<span v-if="!sleep && !loading && !error && updatedDOM" class="userCount"> {{ userCount }} User </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({

	name: 'SearchForm',

	data() {
		return {
			query: '',
			updatedDOM: false
		}
	},

	computed: {
		...mapGetters(['sleep', 'loading', 'error', 'userCount'])
	},

	watch: {
		userCount: function(): void {
			this.$nextTick(() => this.updatedDOM = true )
		}
	},

	methods: {
		search(): void {

			this.$store.commit('set_currentPage', 'rest')

			this.$store
				.dispatch('search', {
					query: this.query,
					style: 'first: 51'
				})
		}
	}

})
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-flow: wrap;
	label {
		width: calc(99% - 100px);
		margin-right: 1%;
		input {
			padding: 10px 15px;
			color: inherit;
			font-size: 1.3rem;
			border: 2px solid gray;
			transition: all .1s ease-in-out;
			width: 100%;
			&:focus {
				outline: none;
				border-color: #9e9e9e;
				box-shadow: 0 0px 5px 2px #9e9e9e;
			}
		}
	}
	button {
		border: 2px solid gray;
		background-color: #d8e7f5;
		font-size: 1rem;
		color: inherit;
		font-weight: bold;
		width: 100px;
		padding: 10px 20px;
		display: inline-block;
		transition: all .25s ease-in-out;
		&:hover {
			box-shadow: inset 0 0px 20px 4px #a9c2ce;
			cursor: pointer
		}
		&:focus {
			border-radius: 0;
		}
	}
}
.userCount {
	display: inline-block;
	margin: 6px 17px;
}

@media screen and (max-width: 500px) {
	form {
		label {
			width: 100% !important;
				margin-right: 0 !important;
				margin-bottom: 20px !important;
		}
		button {
			width: 100% !important
		}
	}
}
</style>