export interface News {
  id: number,
  title: string,
  image: null | string,
  datetime: string,
}

export interface NewsFull extends News {
  content: string;
}

export interface Comment {
  id: number,
  news_id: number,
  author: string,
  text: string,
}