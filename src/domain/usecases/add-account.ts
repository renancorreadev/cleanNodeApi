import { AccountModelIFace } from "../models/account";

export interface AddAccountModelIFace {
  name: string;
  email: string;
  password: string;
}

/**
 * @interface AccountModelIFace is a database (BD) model that represents an account
 */
export interface AddAccountIFace {
  add: (account: AddAccountModelIFace) => AccountModelIFace;
}
