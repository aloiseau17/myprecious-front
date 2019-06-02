import * as component from './components'
let appHelpers = component

export default ({ app }, inject) => {
	// Inject it to nuxt context as $appHelpers
	inject('appHelpers', appHelpers)
}
