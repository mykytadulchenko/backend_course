import supertest from "supertest"
import server from "../src"
import pgDataSource from "../src/db/typeorm/dataSource"
import tokenGenerator from "../src/utils/generateTokens"
import LocalStorage from "./testHelpers"

const testAgent = supertest.agent(server)
const localStorage = new LocalStorage()

describe("testing express app api", () => {
  beforeAll(async () => {
    await pgDataSource.initialize()
  })
  it("test login endpoint", async () => {
    const response = await testAgent
      .post("/api/auth/sign-in")
      .send({ username: "Bret74", password: "12345Great!" })
      .expect(200)
    Object.entries(response.body as Record<string, string>).forEach(([key, val]) => {
      localStorage.setItem(key, val)
    })
  })

  it("test get orders endpoint", async () => {
    const accessToken = localStorage.getItem("refreshToken")!
    const userInfo = tokenGenerator.decodePayload(accessToken)
    await testAgent.auth(accessToken, { type: "bearer" }).get(`/api/orders/${userInfo.id}`).expect(200)
  })

  it("test get chats should return 401 err", async () => {
    const accessToken = localStorage.getItem("refreshToken")!
    const userInfo = tokenGenerator.decodePayload(accessToken)
    await testAgent.auth(null).get(`/api/conversations/chats/${userInfo.id}`).expect(401)
  })
})
