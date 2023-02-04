export interface News {
  id: number,
  title: string,
  image: null | string,
  datetime: string,
}

export interface NewsFull extends News {
  content: string;
}
