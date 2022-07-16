export default (str) => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.substr(1)
}
  