export interface IB {
  title: string;
  author: string;
  coverPhotoUrl: string;
}

export interface ISwapConditionExchange<T = IB> {
  title: string;
  author: string;
  coverPhotoUrl: string;
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


export interface IOwner {
  id: string;
  name: string;
}

export interface ISwappableBook {
  title: string;
  author: string;
  coverPhotoUrl: string;
}

export interface ISwappableGenre {
  id: string;
  name: string;
}

export interface ISwapCondition {
  conditionType: "ByBooks" | "ByGenres" | "OpenForOffers" | "GiveAway";
  giveAway: boolean;
  openForOffers: boolean;
  swappableGenres: ISwappableGenre[];
  swappableBooks: ISwappableBook[];
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  genres: string[];
  language: string;
  description: string;
  condition: string;
  coverPhotoUrl: string;
  owner: IOwner;
  swapCondition: ISwapCondition;
}