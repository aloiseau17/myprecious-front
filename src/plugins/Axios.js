export default function({ $axios }) {
	// Return status codes along side with data
	$axios.onResponse(res => {
		if (res.data) res.data.status = res.status
		else {
			res.data = {}
			res.data.status = res.status
		}
		return res
	})
}
