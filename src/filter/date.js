export default (value) => {
    const date = new Date(value)
    return date.toLocaleString(['pl-PL'], {month: 'short', day: '2-digit', year: 'numeric'})
}