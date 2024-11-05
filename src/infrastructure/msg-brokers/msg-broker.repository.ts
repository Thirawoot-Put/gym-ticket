import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "ticketing-app",
  brokers: ['localhost:9192', 'localhost:9193']
})

// kafka class with static method for connect kafka client
