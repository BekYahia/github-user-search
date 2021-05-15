<template>
	<MyCardSkeleton v-if="!updatedDOM" />
	<div class="card" v-for="user in users" :key="user.node.id">
		<div class="card-header">
			<img width="50" height="50" :src="user.node.avatarUrl" alt="profile pic" />
			<div class="">
				<h2>{{ user.node.name || '-' }}</h2>
				<small>@{{ user.node.login }}</small><br />
				<small><strong>Following:</strong> {{ user.node.following?.totalCount }} </small>&nbsp; &nbsp;
				<small><strong>Followers:</strong> {{ user.node.followers?.totalCount }}</small>

			</div>
		</div>
		<div class="card-body">
			<p> {{ user.node.bio || '-' }} </p>
		</div>
		<div class="card-footer">
			<small v-if="user.node.location">🏠 {{ user.node.location }} </small>&nbsp;
			<small class="stars"> ⭐️ {{ user.node.starredRepositories?.totalCount }}</small>&nbsp; &nbsp;
			<a :href="user.node.url" target="_blank" rel="noopener noreferrer">View <span class="sr-only">{{ user.node.name || user.node.login }}</span></a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyCardSkeleton from '@/components/MyCardSkeleton.vue'
export default defineComponent({

	name: 'MyCard',

	computed: {
		users() {
			return this.$store.state.users
		}
	},

	data() {
		return {
			updatedDOM: false
		}
	},

	components: {
		MyCardSkeleton
	},

	watch: {
		users: function(): void {
			this.$nextTick(() => this.updatedDOM = true)
		}
	},
})
</script>

<style lang="scss" scoped>
.card {
	width: 32.33%;
	border: 1px solid #ddd;
	margin-right: 1%;
	margin-bottom: 10px;
	padding: 10px;
	.card-header {
		display: flex;
		align-items: center;
		img {
			background-color: gray;
			/** for alt text IF it's broke */
			font-size: .8rem;
			color: white;
		}
		div {
			margin-left: 7px;
			h2 {
				margin: 0;
				font-size: 1.3rem
			}
		}
	}
	.card-footer {
		a {
			color: #222;
			&:hover {
				color: #607d8b
			}
		}
		.stars { display: inline-block }
	}
}

@media screen and (max-width: 900px) {
	.card {
		width: 49% !important;
	}
}

@media screen and (max-width: 700px) {
	.card {
		width: 100% !important;
		margin-right: 0 !important;
	}
}
</style>