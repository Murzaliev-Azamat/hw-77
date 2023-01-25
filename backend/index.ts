import cors from 'cors';
import express from 'express';
import fileDb from "./fileDb";
import messagesRouter from "./routers/messages";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
};

run().catch(console.error);
