import { AddAccountModelIFace } from "../../domain/usecases/add-account";
import { AccountModelIFace } from "../../domain/models/account";

export interface AddAccountRepositoryIFace {
  add: (accountData: AddAccountModelIFace) => Promise<AccountModelIFace>;
}
