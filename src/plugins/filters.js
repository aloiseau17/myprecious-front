import Vue from 'vue'

Vue.filter('coma', (val, index, total) => {
	if (index + 1 < total) return val + ', '
	else return val
})
