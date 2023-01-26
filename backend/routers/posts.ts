import express from 'express';
import fileDb from "../fileDb";
import {PostWithoutId} from "../types";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get('', async (req, res) => {
  const posts = await fileDb.getItems();

  console.log(posts)
  res.send(posts);
});

postsRouter.post('', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send({error: 'Поле сообщение отсутствует'});
  }

  const post: PostWithoutId = {
    author: req.body.author,
    message: req.body.message,
    image: req.file ? req.file.filename : null,
  };

  const savedProduct = await fileDb.addItem(post);
  res.send(savedProduct);
});

export default postsRouter;
