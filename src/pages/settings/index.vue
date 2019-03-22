<template>
	<div>
		<h1>Manage settings</h1>

		<form @submit.prevent="updateUserSettings">

			<div>
				<label for="order">
					List order
				</label>
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

			<div>
				<input
					type="submit"
					value="Update">
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			orderSelected: null
		}
	},
	computed: {
		user() {
			return this.$auth.$state.user
		},
		order() {
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
		}
	}
}
</script>
