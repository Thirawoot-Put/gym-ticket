import { MONGO_DB_URI } from "@/shared/config/env";
import { Collection, Db, MongoClient } from "mongodb";

const client = new MongoClient(MONGO_DB_URI);

class MongoDb {
  static db: Db
  static coll: { [key: string]: Collection } = {}

  static async connect() {
    try {
      await client.connect()
      console.log("Connect MongoDB success")

      this.db = client.db('ticketing')
      await this.initCollection()
    } catch (e: any) {
      console.error(e)
    }
  }

  static async initCollection() {
    await this.db.createCollection("user")
    this.coll["user"] = this.db.collection("user")

    console.log("Create collection success:", Object.keys(this.coll))
  }

  static getCollection(collName: string) {
    const collection = this.coll[collName];
    if (!collection) {
      throw new Error(`Collection ${collName} is not initialized`);
    }
    return collection;
  }

  static async getClient() {
    return client
  }

  static async close() {
    await client.close()
    console.log("End of connection to MongoDB")
  }
}

export default MongoDb
