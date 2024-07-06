export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('token', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const clearTokens = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}
export const getToken = (name:string) => {
  return localStorage.getItem(name)
}