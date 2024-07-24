const storageName = "tokens"

interface ITokens {
  refreshToken: string
  accessToken: string
}

interface IGet {
    (): ITokens | null
}

interface ISet {
    (tokens: ITokens): void
}

export const getTokens: IGet = () => {
  const tokens = localStorage.getItem(storageName)
  return tokens ? JSON.parse(tokens) : null
}

export const setTokens: ISet = (tokens) => {
  localStorage.setItem(storageName, JSON.stringify(tokens))
}

export const removeTokens = () => {
  localStorage.removeItem(storageName)
}
