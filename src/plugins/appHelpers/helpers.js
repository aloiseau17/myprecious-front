import * as component from './components'
let appHelpers = component

export default ({ app }) => {
	// Inject it to nuxt context as $appHelpers
	app.addHelpers = appHelpers
}
