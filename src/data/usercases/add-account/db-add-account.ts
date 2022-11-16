import {
  AddAccountIFace,
  AddAccountModelIFace,
  AccountModelIFace,
  EncrypterIFace
} from "./db-add-account.protocols";

export class DbAddAccount implements AddAccountIFace {
  private readonly encrypter: EncrypterIFace;

  /**
   * The constructor function takes an object that implements the EncrypterIFace
   * interface and assigns it to the encrypter property
   * @param {EncrypterIFace} encrypter - EncrypterIFace
   */
  constructor(encrypter: EncrypterIFace) {
    this.encrypter = encrypter;
  }

  /**
   * "It receives an account, encrypts the password, and returns a promise that
   * resolves to an account."
   *
   * The first thing we do is call the encrypt function of the encrypter. We pass the
   * password of the account we received
   * @param {AddAccountModelIFace} account - AddAccountModelIFace
   * @returns A promise that resolves to an AccountModelIFace
   */
  async add(account: AddAccountModelIFace): Promise<AccountModelIFace> {
    await this.encrypter.encrypt(account.password);
    return await new Promise((resolve) =>
      resolve({
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password"
      })
    );
  }
}
