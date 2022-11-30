import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

describe("Signup Routes", () => {
  const mongoURL =
    process.env.MONGO_URL !== undefined ? process.env.MONGO_URL : "";

  beforeAll(async () => {
    await MongoHelper.connect(mongoURL);
  });

  /** Pos Initialize on tests */
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  test("should return an account on sucess", async () => {
    await request(app).post("/api/signup").send({
      name: "Renan",
      email: "renan.correa@codeby.com.br",
      password: "123",
      passwordConfirmation: "123"
    });
    expect(200);
  });
});
