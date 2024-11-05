import { MONGO_DB_URI } from "@/shared/config/env";
import { Collection, Db, MongoClient } from "mongodb";
import { CustomError } from "../middlewares/exception";
import StatusCodes from "./statusCode";

const client = new MongoClient(MONGO_DB_URI);

class MongoDb {
  static db: Db
  static clt: { [key: string]: Collection } = {}

  static async connect() {
    try {
      await client.connect()
      console.log("Connect MongoDB success")

      this.db = client.db('ticketing')
      this.initCollection()
    } catch (e: any) {
      console.error(e)
    }
  }

  static initCollection() {
    this.clt["user"] = this.db.collection('user')
  }

  static getCollection(cltName: string) {
    const collection = this.clt[cltName]
    if (!collection) throw new CustomError("COLLECTION_NOT_FOUND", StatusCodes.NOT_FOUND)

    return collection
  }

  static async GetClient() {
    return client
  }

  static async close() {
    await client.close()
    console.log("End of connection to MongoDB")
  }
}

export default MongoDb
