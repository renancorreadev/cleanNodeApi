export interface EncrypterIFace {
  encrypt: (value: string) => Promise<string>;
}
