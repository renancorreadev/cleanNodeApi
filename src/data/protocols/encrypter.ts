/* Defining an interface for the Encrypter class. */
export interface EncrypterIFace {
  encrypt: (value: string) => Promise<string>;
}
