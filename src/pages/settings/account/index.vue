<template>
	<div>
		<h1>My account</h1>
		<email-form />
		<br>
		<hr>
		<br>
		<password-form />
	</div>
</template>

<script>
import EmailForm from '~/components/User/EmailForm'
import PasswordForm from '~/components/User/PasswordForm'
export default {
	components: {
		'email-form': EmailForm,
		'password-form': PasswordForm
	}
}
</script>
