import { EncrypterIFace } from "./db-add-account.protocols";
import { DbAddAccount } from "./db-add-account";

/* Defining the types of the sut and the encrypterStub. */
interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: EncrypterIFace;
}

/**
 * It returns an instance of the EncrypterStub class
 * @returns A new instance of the EncrypterStub class.
 */
const makeEncrypter = (): EncrypterIFace => {
  class EncrypterStub implements EncrypterIFace {
    async encrypt(value: string): Promise<string> {
      return await new Promise((resolve) => resolve("hashed_password"));
    }
  }

  return new EncrypterStub();
};

/**
 * It creates a new instance of DbAddAccount and returns it along with its
 * dependencies
 * @returns The sut and the encrypterStub
 */
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub
  };
};

/* A test for the DbAddAccount class. */
describe("DbAccount UseCase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();

    const encrypterSpy = jest.spyOn(encrypterStub, "encrypt");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };
    await sut.add(accountData);
    expect(encrypterSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password"
    };

    const accountPromise = sut.add(accountData);
    await expect(accountPromise).rejects.toThrow();
  });
});
