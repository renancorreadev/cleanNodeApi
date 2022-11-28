import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    // @ts-expect-error
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    });
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }
};
