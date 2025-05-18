import { BookConditionEnum } from "../../addUpdateBook/types/enum";

export interface IBook {
  title: string;
  author: string;
  coverPhotoUrl: string;
}

export interface ISwapCondition<T = IBook> {
  conditionType: BookConditionEnum;
  giveAway: boolean;
  openForOffers: boolean;
  swappableGenres: {
    id: string;
    name: string;
  }[];
  swappableBooks: T[];
}
export interface IExchange {
  type: string;
  title: string;
  author: string;
}