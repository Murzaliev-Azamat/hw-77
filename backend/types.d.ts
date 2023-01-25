export interface Message {
  id: string;
  author: string;
  message: string;
  date: string;
}

export type MessageWithoutId = Omit<Message, 'id', 'date'>;