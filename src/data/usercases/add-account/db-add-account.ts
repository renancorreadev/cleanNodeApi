import {
  AddAccountIFace,
  AddAccountModelIFace
} from "../../../domain/usecases/add-account";
import { AccountModelIFace } from "../../../domain/models/account";
import { EncrypterIFace } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccountIFace {
  private readonly encrypter: EncrypterIFace;

  constructor(encrypter: EncrypterIFace) {
    this.encrypter = encrypter;
  }

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
