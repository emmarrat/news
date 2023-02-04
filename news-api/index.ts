import cors from 'cors';
import express from 'express';
import mysqlDb from "./mysqlDb";
import newsRouter from "./routes/news";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/news', newsRouter);
// app.use('/comments', commentsRouter);



const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log('we are live on' + port);
  });
};

run().catch(console.error);

