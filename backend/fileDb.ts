import { promises as fs } from 'fs';
import {randomUUID} from "crypto";
import {Message, MessageWithoutId} from "./types";

const filename = './db.json';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getItems() {
    return data;
  },

  async addItem(item: MessageWithoutId) {
    const id = randomUUID();
    const message = {
      id: id,
      date: new Date().toISOString(),
      ...item,
    }
    data.push(message);
    await this.save();
    return message;
  },

  async save() {
    await fs.writeFile(filename, JSON.stringify(data));
  }
};

export default fileDb;