import { BYBOOKS } from './../../../utility/ADDBOOKCONDITIONTYPE';
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


export interface SwapBookType {
  title: string;
  author: string;
  coverPhotoUrl: string;
}

interface IBookSwapCondition {
  swappableBooks?: Array<{
    title: string;
    author: string;
    coverPhotoUrl: string;
  }>;
  conditionType?: 'BY_BOOKS' | 'OPEN_TO_OFFERS' | 'BY_GENRES' | 'GIVE_AWAY';
  exchangeableGenres?: Array<{ name: string }>;
}

export interface IBookDataType {
  id?: string;
  title?: string;
  author?: string;
  description?: string;
  language?: string;
  condition?: string;
  genres?: string[];
  coverPhotoUrls?: string[];
  swapCondition?: IBookSwapCondition;
  exchangeCondition?: {
    exchangeableGenres?: Array<{ name: string }>;
  };
}