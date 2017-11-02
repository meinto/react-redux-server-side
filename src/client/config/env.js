
export const isProduction = () => {
  return (process.env && process.env.NODE_ENV) ? process.env.NODE_ENV == 'production' : false
  // return false
}
