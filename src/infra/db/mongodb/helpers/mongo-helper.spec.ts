import { MongoHelper as sut } from "./mongo-helper";

describe("Mongo Helper", () => {
  beforeAll(async () => {
    const mongoURL =
      process.env.MONGO_URL !== undefined ? process.env.MONGO_URL : "";
    await sut.connect(mongoURL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test("should reconnect if mongodb is down", async () => {
    let accountCollection = await sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();

    await sut.disconnect();

    accountCollection = await sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();
  });
});
