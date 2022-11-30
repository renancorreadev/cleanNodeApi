import { AddAccountRepositoryIFace } from "../../../../data/protocols/add-account-repository";
import { AddAccountModelIFace } from "../../../../domain/usecases/add-account";
import { AccountModelIFace } from "../../../../domain/models/account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepositoryIFace {
  async add(accountData: AddAccountModelIFace): Promise<AccountModelIFace> {
    const accountCollection = await MongoHelper.getCollection("accounts");

    const result = await accountCollection.insertOne(accountData);
    console.log(MongoHelper.map(result.ops[0]));
    return MongoHelper.map(result.ops[0]);
  }
}
