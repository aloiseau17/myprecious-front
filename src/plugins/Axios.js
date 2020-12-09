export default function ({ $axios }) {
  // Return status codes along side with data
  $axios.onResponse((res) => {
    if (typeof res.data === 'string') {
      const data = {
        data: res.data,
        status: res.status,
      }
      res.data = data
    } else {
      res.data.status = res.status
    }
    return res
  })
}
