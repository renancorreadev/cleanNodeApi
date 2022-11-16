import { AccountModelIFace } from "../models/account";

/* A type definition for the `add` method. */
export interface AddAccountModelIFace {
  name: string;
  email: string;
  password: string;
}

/**
 * A type definition for the `add` method
 * @interface AccountModelIFace is a database (BD) model that represents an account
 */
export interface AddAccountIFace {
  add: (account: AddAccountModelIFace) => Promise<AccountModelIFace>;
}
