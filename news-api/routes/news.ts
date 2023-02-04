import express from "express";
import mysqlDb from "../mysqlDb";
import {imagesUpload} from "../multer";
import config from "../config";
import {News, NewsFull} from "../types";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query('SELECT * FROM news');
  const newsList = result[0] as News[];
  const filteredNews: News[] = newsList.map(news => {
    return {
      id: news.id,
      title: news.title,
      image: news.image,
      datetime: news.datetime
    }
  })
  res.send(filteredNews);
});

newsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    'SELECT * FROM news WHERE id = ?',
    [req.params.id]
  );

  const newsList = result[0] as NewsFull[];
  const news = newsList[0];

  if (!news) {
    return res.sendStatus(404).send({message: 'News not found!'});
  }
  res.send(news);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({message: 'title and content of the news are mandatory required!'});
  }
  const {title, content} = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    const connection = mysqlDb.getConnection();
    const sql = connection.format(
      'INSERT INTO news (title, content, image) VALUES (?, ?, ?)',
      [title, content, image]
    );
    const result = await connection.query(sql);
    res.send({message: 'News was successfully posted!', info: result});

  } catch (e) {
    res.status(400).send({message: "Error!", errorInfo: e});
  }
});

newsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const id = req.params.id;
  const selectQuery = 'SELECT * FROM news WHERE id = ?';
  const deleteQuery = 'DELETE FROM news WHERE id = ?';

  try {
    const result = await connection.query(selectQuery, [id]);
    const [news] = result[0] as NewsFull[];
    await connection.query(deleteQuery, [id]);
    res.send({message: 'News deleted'});
    if (news.image !== null) {
      const fs = require('fs');
      const link = `${config.publicPath}/${news.image}`;
      fs.unlink(link, (err: Error) => {
        if (err) throw err;
      });
    }
  } catch (e) {
    res.status(400).send({
      message: 'Error!',
      errorDescription: e,
    });
  }
});

export default newsRouter;
