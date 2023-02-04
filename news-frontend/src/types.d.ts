export interface News {
  id: number,
  title: string,
  image: null | string,
  datetime: string,
}

export interface NewsFull extends News {
  content: string;
}

export interface NewsFromUser {
  title: string,
  content: string,
  image: File | null;
}

export interface CommentsFromUser {
  news_id: number,
  author: string | null,
  text: string,
}

export interface Comments extends CommentsFromUser{
  id: number,
}


