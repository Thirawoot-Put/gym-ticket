export interface IMsgProducer {
  connect(): Promise<void>
  send(topic: string, message: string): Promise<void>
  disconnect(): Promise<void>
}

export interface IMsgConsumer {
  connect(): Promise<void>
  subscribe(topic: string): Promise<void>
  consumeMsg(processingCB: (messageValue: string) => void | Promise<void>, maxRetries: number): Promise<void>
  disconnect(): Promise<void>
}
