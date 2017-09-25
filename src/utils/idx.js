
export const idx = (input, callback) => {
  try {
    const result = callback(input)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

global.idx = idx
