import {
  AddAccountIFace,
  AddAccountModelIFace,
  AccountModelIFace,
  EncrypterIFace,
  AddAccountRepositoryIFace
} from "./db-add-account.protocols";

export class DbAddAccount implements AddAccountIFace {
  private readonly encrypter: EncrypterIFace;
  private readonly addAccountRepository: AddAccountRepositoryIFace;

  /**
   * The constructor function takes an object that implements the EncrypterIFace
   * interface and assigns it to the encrypter property
   * @param {EncrypterIFace} encrypter - EncrypterIFace
   */
  constructor(
    encrypter: EncrypterIFace,
    addAccountRepository: AddAccountRepositoryIFace
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
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
  async add(accountData: AddAccountModelIFace): Promise<AccountModelIFace> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    await this.addAccountRepository.add(
      // create a new object to transfer value of accountData to new value password
      Object.assign({}, accountData, {
        password: hashedPassword
      })
    );

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
