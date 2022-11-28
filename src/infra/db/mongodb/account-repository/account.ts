import { AddAccountRepositoryIFace } from "../../../../data/protocols/add-account-repository";
import { AddAccountModelIFace } from "../../../../domain/usecases/add-account";
import { AccountModelIFace } from "../../../../domain/models/account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepositoryIFace {
  async add(accountData: AddAccountModelIFace): Promise<AccountModelIFace> {
    const accountCollection = MongoHelper.getCollection("accounts");

    const result = await accountCollection.insertOne(accountData);

    const account = {
      _id: result.insertedId.toString(),
      name: "any_name",
      email: "any_email@gmail.com.br",
      password: "any_password"
    };

    return MongoHelper.map(account);
  }
}
