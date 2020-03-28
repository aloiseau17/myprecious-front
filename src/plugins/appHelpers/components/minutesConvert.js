const minutesConvert = (min) => {
	if (!min) return false

	let num = min
	let hours = num / 60
	let rhours = Math.floor(hours)
	let minutes = (hours - rhours) * 60
	let rminutes = Math.round(minutes)

	return {
		hours: rhours,
		minutes: rminutes,
	}
}

export default minutesConvert
