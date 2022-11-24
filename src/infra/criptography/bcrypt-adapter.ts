import { EncrypterIFace } from "../../data/protocols/encrypter";
import bcrypt from "bcrypt";

export class BcryptAdapter implements EncrypterIFace {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }
}
