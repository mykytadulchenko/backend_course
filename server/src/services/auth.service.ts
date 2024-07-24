import pgDataSource from "../db/typeorm/dataSource"
import JWT from "../db/typeorm/entities/JWT"

class AuthService {
  getTokensByUserId = async (userId: string) => {
    const tokens: { access_token: string; refresh_token: string } = (await pgDataSource
      .getRepository(JWT)
      .findOneBy({ user_id: userId }))!
    return tokens
  }

  setTokens = async (userId: string, tokens: { accessToken: string; refreshToken: string }) => {
    const { accessToken, refreshToken } = tokens
    await pgDataSource
      .getRepository(JWT)
      .upsert({ access_token: accessToken, refresh_token: refreshToken, user_id: userId }, ["user_id"])
  }

  updateTokens = async (userId: string, tokens: { accessToken: string; refreshToken: string }) => {
    const tokensFromDB = await this.getTokensByUserId(userId)
    const { accessToken, refreshToken } = tokens
    const updatedTokens = {
      ...tokensFromDB,
      access_token: accessToken,
      refresh_token: refreshToken,
    }
    await pgDataSource.getRepository(JWT).update({ user_id: userId }, updatedTokens)
  }
}

const authService = new AuthService()

export default authService
