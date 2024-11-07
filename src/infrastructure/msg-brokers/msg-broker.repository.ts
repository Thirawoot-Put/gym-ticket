import { Kafka } from "kafkajs";
import { IMsgConsumer, IMsgProducer } from "@/infrastructure/msg-brokers/interface";
import { KAFKA_CLIENT_ID } from "@/shared/config/env";


// kafka class with static method for connect kafka client
export class MsgProducer implements IMsgProducer {
  private kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: ['localhost:9092', 'localhost:9093']
  })

  public producer = this.kafka.producer()

  async connect() {
    try {
      await this.producer.connect()
      console.info("*Kafka producer connecting success*")
    } catch (e) {
      console.error("Failed to connect kafka producer", e)
    }
  }

  async send(topic: string, messageValue: any) {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            //key: '' // ---> access some key from function
            value: JSON.stringify(messageValue)
          }
        ]
      })
      console.log(`--> Producer send message to ${topic} topic`)
    } catch (e: any) {
      console.error('Failed to write a message', e)
    }
  }

  async disconnect() {
    await this.producer.disconnect()
    console.info('Kafka producer disconnected')
  }
}

export class MsgConsumer implements IMsgConsumer {
  private kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: ['localhost:9092', 'localhost:9093']
  })

  public consumer = this.kafka.consumer({ groupId: KAFKA_CLIENT_ID })

  async connect() {
    try {
      await this.consumer.connect()
      console.info('<Kafka consumer connecting success>')
    } catch (e: any) {
      console.error('Failed to connect kafka consumer', e)
    }
  }

  async subscribe(topic: string) {
    await this.consumer.subscribe({ topics: [topic], fromBeginning: true })
    console.info(`Consumer subscribe ${topic}`)
  }

  async consumeMsg(processingCB: (messageValue: string) => void | Promise<void>, maxRetries = 3) {
    let retries = 0

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) {
          console.trace('Invalid kafka message value')
          return
        }
        console.log(`Consume message from ${topic} topic`)
        let success = false

        while (retries < maxRetries && !success) {
          try {
            const result = processingCB(message.value.toString())

            if (result instanceof Promise) {
              await result
            }

            success = true
          } catch (e) {
            retries++
            console.error(`Error to process message ${retries} round:`, e)

            if (retries >= maxRetries) {
              console.error('Send to DLQ(Dead letter queue) consumer')
              // other error handling
            }
          }
        }
      }
    })
  }

  async disconnect() {
    await this.consumer.disconnect()
    console.info('Kafka consumer disconnected')
  }
}
