import { SwapType } from "./enum";

export type TOptions = {
  label: string;
  value: string;
};
export interface IBookDetailsProps {
  languageOptions: TOptions[] | undefined;
  conditionOptions: TOptions[] | undefined;
}
export interface IBook {
  bookTitle: string;
  authorName: string;
  byBookCover: string | File;
}
export interface IAddUpdateBookData {
  books: IBook[];
  favGenres: string[];
  conditionType: SwapType;
  language: string;
  title: string;
  genres: string[];
  condition: string;
  description: string;
  author: string;
  bookCovers: (File | string)[];
}



// ===================
interface Book {
  title: string;
  author: string;
  coverPhotoUrl: string;
}
interface IGenre {
  name: string;
}

interface ISwapCondition {
  conditionType: SwapType;
  giveAway: boolean;
  openForOffers: boolean;
  swappableBooks?: Book[];
  swappableGenres?: IGenre[];
  exchangeableGenres?: IGenre[];
}

interface IExchangeCondition {
  exchangeableGenres?: IGenre[];
}

export interface IBookData {
  id?: string;
  title: string;
  author: string;
  description: string;
  language: string;
  condition: string;
  genres: string[];
  coverPhotoUrls: (string | File)[];
  swapCondition?: ISwapCondition;
  exchangeCondition?: IExchangeCondition;
  ownerId?: string;
}

// Form data interface that extends BookData with form-specific fields
export interface IAddUpdateBook {
  books: {
    bookTitle: string;
    authorName: string;
    byBookCover: File | string | null;
  }[];
  favGenres: string[];
  conditionType: SwapType;
  language: string;
  title: string;
  genres: string[];
  condition: string;
  description: string;
  author: string;
  bookCovers: (File | string)[];
}