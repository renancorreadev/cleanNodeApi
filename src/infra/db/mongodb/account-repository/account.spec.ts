import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";

/** Test Integration to MongoDB */
describe("Account Mongo Repository", () => {
  /** Pre initialize on tests */

  beforeAll(async () => {
    await MongoHelper.connect(
      process.env.MONGO_URL != null ? process?.env?.MONGO_URL : ""
    );
  });

  /** Pos Initialize on tests */
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test("Should return an account on Sucess", async () => {
    const sut = makeSut();

    const account = await sut.add({
      name: "",
      email: "",
      password: ""
    });

    /** toBeTruthy is not undefined or null */
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@gmail.com.br");
    expect(account.password).toBe("any_password");
  });
});
