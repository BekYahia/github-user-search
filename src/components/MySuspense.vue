<template>
	<slot v-if="sleep" name="sleep"></slot>

	<slot v-if="!sleep && !loading && !error" name="feedback"></slot>

	<p v-if="!sleep && !loading && error" class="error">
		<slot name="error">bummber, it's an error!</slot>
	</p>

	<slot v-if="loading" name="default">
		loading...
	</slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({

	name: 'MySuspense',

	computed: {
		...mapState(['loading', 'error', 'sleep'])
	}

})
</script>

<style scoped>
.error {
	background-color: pink;
    padding: 15px 20px;
    margin: auto;
    color: crimson;
}
</style>