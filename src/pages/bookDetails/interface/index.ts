export interface IBook {
  title: string;
  author: string;
  coverPhotoUrl: string;
}

export interface ISwapCondition<T = IBook> {
  conditionType: "ByBooks" | "ByGenres" | "OpenForOffers" | "GiveAway";
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