import mongoose from "mongoose"
import { MONGO_DB_URI } from "./env"

(async () => {
  mongoose.connect(MONGO_DB_URI).catch((e) => console.error(`Failed to connect Mongo DB: ${e.message}`))
})()
