import { EncrypterIFace } from "../../data/protocols/encrypter";
import bcrypt from "bcrypt";

export class BcryptAdapter implements EncrypterIFace {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(values: string): Promise<string> {
    const hash = await bcrypt.hash(values, this.salt);
    return hash;
  }
}
