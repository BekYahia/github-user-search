<template>
<div class="skeleton" v-for="i in 9" :key="i">
	<div class="skeleton-img"></div>
	<div class="skeleton-text">
		<h2 class="skeleton-title"></h2>
		<p class="skeleton-description">
			<span></span>
			<span></span>
		</p>
		<p class="skeleton-description">
			<span></span>
			<span></span>
		</p>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'MyCardSkeleton'
})
</script>

<style scoped>
.skeleton {
	display: flex;
	justify-content: space-around;
	padding: 10px;
	width: 32.33%;
	margin-right: 1%;
	margin-bottom: 10px;
	border-radius: 10px;
	background-color: #E2E8F0;
	transition: all 2s ease-in-out; 
	box-shadow:
	0 9px 33px rgba(0, 0, 0, 0.07);
}


.skeleton-text{
	display: flex;
	flex-direction: column;
	width: 250px;
	margin-left: 10px;
}


.skeleton-img{
	width: 75px;
	height: 75px;
	border-radius: 50%;
}


.skeleton-description{
	margin: 10px 0;
}


	/** */
.skeleton-img{
        animation: pulse 2s infinite ease-in-out;
    }

.skeleton-description span:nth-child(1){
	display: block;
	width: 210px;
	height: 10px;
	background-color: #94A3B8;
}

.skeleton-description span:nth-child(2){
	display: block;
	width: 150px;
	height: 10px;
	background-color: #CBD5E1;
	margin-top: 5px;
}

	/** */
@keyframes pulse {
	0% {
		background-color: #CBD5E1;
	}

	50% {
		background-color: #94A3B8;
	}

	100% {
		background-color: #CBD5E1;
	}
}

/** */
.skeleton-title{
	margin: 10px 0 7px;
	width: 150px;
	height: 12px;
	animation: pulse 2s infinite ease-in-out;
}

.skeleton-img{
	animation: pulse 2s infinite ease-in-out;
}

.skeleton-description span:nth-child(1){
	display: block;
	width: 210px;
	height: 10px;
	animation: pulse 2s infinite ease-in-out;
}

.skeleton-description span:nth-child(2){
	display: block;
	width: 150px;
	height: 10px;
	animation: pulse 2s infinite ease-in-out;
	margin-top: 5px;
}

@media screen and (max-width: 900px) {
	.skeleton {
		width: 49% !important;
	}
}

@media screen and (max-width: 700px) {
	.skeleton {
		width: 100% !important;
		margin-right: 0 !important;
	}
}
</style>