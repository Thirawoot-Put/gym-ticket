import { Kafka, KafkaMessage } from "kafkajs";
import { KAFKA_CLIENT_ID } from "../config/env";


// kafka class with static method for connect kafka client
class KafkaProducer {
  private kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: ['localhost:9192', 'localhost:9193']
  })

  public producer = this.kafka.producer()

  async connect() {
    try {
      await this.producer.connect()
      console.info("Kafka producer connecting success")
    } catch (e) {
      console.error("Failed to connect kafka producer", e)
    }
  }

  async send(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            //key: '' // ---> access some key from function
            value: message
          }
        ]
      })
    } catch (e: any) {
      console.error('Failed to write a message', e)
    }
  }

  async disconnect() {
    await this.producer.disconnect()
  }
}

class KafkaConsumer {
  private kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: ['localhost:9192', 'localhost:9193']
  })

  public consumer = this.kafka.consumer({ groupId: KAFKA_CLIENT_ID })

  async connect() {
    try {
      await this.consumer.connect()
      console.info('Kafka consumer connecting')
    } catch (e: any) {
      console.error('Failed to connect kafka consumer', e)
    }
  }

  async subscribe(topic: string) {
    await this.consumer.subscribe({ topic: topic })
    console.info(`Consumer subscribe ${topic}`)
  }

  async consume(processingCB: (message: KafkaMessage) => void | Promise<void>, maxRetries = 3) {
    let retries = 0

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Consume message from ${topic} topic`)
        let success = false

        while (retries < maxRetries && !success) {
          try {
            const result = processingCB(message)

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
