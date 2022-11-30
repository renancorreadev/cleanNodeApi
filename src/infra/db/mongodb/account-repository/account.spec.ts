import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";

/** Test Integration to MongoDB */
describe("Account Mongo Repository", () => {
  /** Pre initialize on tests */
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test("Should return an account on Sucess", async () => {
    const sut = makeSut();

    const account = await sut.add({
      name: "any_name",
      email: "any_email@gmail.com.br",
      password: "any_password"
    });

    /** toBeTruthy is not undefined or null */
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@gmail.com.br");
    expect(account.password).toBe("any_password");
  });
});
