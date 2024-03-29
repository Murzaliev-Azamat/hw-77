import cors from 'cors';
import express from 'express';
import fileDb from "./fileDb";
import postsRouter from "./routers/posts";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/posts', postsRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
};

run().catch(console.error);
