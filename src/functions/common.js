export const isValidEmailFormat = (email) => {
  const regex = /^\w+[\w\.]*\w+@\w+[\w\.]*\.\w+[\w\.]*[A-Za-z]+$/i
  return regex.test(email)
}

export const isValidRequiredInput = (...args) => {
  let validator = true
  for (let i=0; i < args.length; i=(i+1)|0) {
    if (args[i] === '') {
      validator = false
    }
  }
  return validator
}