export type TOpts = {
  topic?: string;
  maxRetries: number;
};

export interface IMsgProducer {
  connect(): Promise<void>;
  send(topic: string, message: any): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IMsgConsumer {
  connect(): Promise<void>;
  subscribeForOneGroupIdFromBeginning(topic: string): Promise<void>;
  consumeMsg(
    processingCB: (messageValue: string) => void | Promise<void>,
    opts?: TOpts
  ): Promise<void>;
  disconnect(): Promise<void>;
}
