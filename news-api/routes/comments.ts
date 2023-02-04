import express from "express";
import mysqlDb from "../mysqlDb";
import {Comment} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();
  let result = await connection.query('SELECT * FROM comments');
  const queryNews = req.query.news_id as string;

  if (queryNews) {
    result = await connection.query(
      `SELECT * FROM comments WHERE news_id = ?`,
      [queryNews]);
  }
  const commentsList = result[0] as Comment[];

  res.send(commentsList);
});

commentsRouter.post('/', async (req, res) => {
  if (!req.body.news_id || !req.body.text) {
    return res.status(400).send({message: 'news_id and text of the comment are mandatory required!'});
  }
  const {news_id, author, text} = req.body;

  const fixedAuthor = author === '' ? null : author;

  const connection = mysqlDb.getConnection();
  try {
    const sql = connection.format(
      'INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)',
      [news_id, fixedAuthor, text]
    );
    const result = await connection.query(sql);
    res.send({message: 'Comment was successfully posted!', info: result});
  } catch (e) {
    res.status(400).send({message: 'Error! news_id has to exist!'});
  }

});

commentsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM comments WHERE id = ?`;
  const connection = mysqlDb.getConnection();
  try {
    await connection.query(query, [id]);
    res.send({message: 'Comment deleted'});
  } catch (e) {
    res.status(400).send({message: "Error!", errorInfo: e});
  }
});

export default commentsRouter;
