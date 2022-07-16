export default (clazz) => {
    return {
      info(...args) {
        console.log(`[${clazz.name}]`, ...args)
      },
      warn(...args) {
        console.log(`[${clazz.name}]`, ...args)
      },
      error(...args) {
        console.error(`[${clazz.name}]`, ...args)
      }
    }
  }