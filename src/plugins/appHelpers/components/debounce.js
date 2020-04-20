let timeout

const debounce = (cb, wait) => {
  clearTimeout(timeout)
  timeout = setTimeout(cb, wait)
}

export default debounce
