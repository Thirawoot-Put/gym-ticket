export interface IMsgProducer {
  connect(): Promise<void>
  send(topic: string, message: any): Promise<void>
  disconnect(): Promise<void>
}

export interface IMsgConsumer {
  connect(): Promise<void>
  subscribe(topic: string): Promise<void>
  consumeMsg(processingCB: (messageValue: any) => void | Promise<void>, maxRetries: number): Promise<void>
  disconnect(): Promise<void>
}
