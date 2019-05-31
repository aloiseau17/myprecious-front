<template>
	<div>
		<div class="back-btn__wrapper">
			<nuxt-link
				:to="lastPage"
				class="back-btn">
				<img
					src="/images/back.svg"
					alt="Back button">
			</nuxt-link>
		</div>

		<div class="content__title-wrapper">
			<h1 class="content__title">Manage settings</h1>
		</div>

		<form
			class="form"
			@submit.prevent="updateUserSettings">

			<div class="form__group">
				<label for="order">List order</label>
				<select
					v-model="orderSelected"
					:value="order"
					name="order">
					<option value="created_at__desc">Most recent first</option>
					<option value="created_at__asc">Older first</option>
					<option value="title__asc">Alphabetical order</option>
					<option value="title__desc">Alphabetical order (reverse)</option>
				</select>
			</div>

			<div class="form__footer">
				<button
					class="btn"
					type="submit">
					Update				
				</button>
				<nuxt-link
					:to="lastPage"
					class="form__cancel back-btn">
					cancel
				</nuxt-link>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	layout: 'form',
	data() {
		return {
			orderSelected: null
		}
	},
	computed: {
		lastPage() {
			return this.$store.getters['navigation/getSavedPage']
		},
		user() {
			return this.$auth.$state.user
		},
		order() {
			// default
			if (!this.user.user_options) return 'created_at__desc'

			return (
				this.user.user_options.list_order_by +
				'__' +
				this.user.user_options.list_order
			).toLowerCase()
		}
	},
	mounted() {
		this.orderSelected = this.order
	},
	methods: {
		async updateUserSettings() {
			let newData = this.orderSelected.split('__')
			let data = {
				list_order_by: newData[0],
				list_order: newData[1]
			}
			await this.$store.dispatch('user/updateSettings', data)
			await this.$auth.fetchUser() // update auth store

			// reset movies list saved
			this.$store.dispatch('movies/resetMoviesList')
			// redirect to last page
			this.$router.push({
				path: this.$store.getters['navigation/getSavedPage']['path']
			})
		}
	}
}
</script>
