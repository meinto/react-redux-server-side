
export const idx = (input, callback) => {
  try {
    const result = callback(input)
    return result
  } catch (error) {
    return null
  }
}

global.idx = idx
