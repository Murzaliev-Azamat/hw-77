import express from 'express';
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);

  const messages = await fileDb.getItems();

  const newMessages = messages.filter(message => message.date > queryDate);

  if (queryDate) {
    if (isNaN(date.getDate())) {
      return res.status(400).send({error: 'Invalid datetime'});
    }
    res.send(newMessages);
  }

  if (!queryDate) {
    res.send(messages.slice(-30));
  }
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res.status(400).send({error: 'All fields are required'});
  }

  const message: MessageWithoutId = {
    author: req.body.author,
    message: req.body.message,
  };

  const savedMessage = await fileDb.addItem(message);
  // res.send(savedMessage);
});

export default messagesRouter;
