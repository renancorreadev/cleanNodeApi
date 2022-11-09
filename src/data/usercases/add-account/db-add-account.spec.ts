import { EncrypterIFace } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: EncrypterIFace;
}

/**
 * that is responsible for encrypting a string
 * @returns {EncrypterIFace}
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
 * create an instance of DbAddAccount with parameter
 * informed of the return of encrypterStub
 * @returns {encrypterStub & sut }
 */
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub
  };
};

/**
 * @test receber os dados formatados corretamente pro
 * nosso Controller e receber o nome e senha,
 * recebe os dados e insere os usuarios
 * criando uma conta criptografando a senha
 */
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
});
