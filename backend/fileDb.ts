import { promises as fs } from 'fs';
import {randomUUID} from "crypto";
import {Post, PostWithoutId} from "./types";

const filename = './db.json';
let data: Post[] = [];

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

  async addItem(item: PostWithoutId) {
    const id = randomUUID();
    const post = {
      id: id,
      ...item,
    }
    data.push(post);
    await this.save();
    return post;
  },

  async save() {
    await fs.writeFile(filename, JSON.stringify(data));
  }
};

export default fileDb;