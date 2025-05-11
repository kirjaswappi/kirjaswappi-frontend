export interface IBook {
  bookTitle: string;
  authorName: string;
  byBookCover: string | File;
}
export interface IAddUpdateBookData {
  books: IBook[];
  favGenres: string[];
  conditionType: string;
  language: string;
  title: string;
  genres: string[];
  condition: string;
  description: string;
  author: string;
  bookCovers: (File | string)[];
}

export type TOptions = {
  label: string;
  value: string;
};