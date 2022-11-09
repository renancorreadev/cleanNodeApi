import { DbAddAccount } from "./db-add-account";

/**
 * @test receber os dados formatados corretamente pro
 * nosso Controller e receber o nome e senha,
 * recebe os dados e insere os usuarios
 * criando uma conta criptografando a senha
 */
describe("DbAccount UseCase", () => {
  test("Should call Encrypter with correct password", async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return await new Promise((resolve) => resolve("hashed_password"));
      }
    }

    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
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
