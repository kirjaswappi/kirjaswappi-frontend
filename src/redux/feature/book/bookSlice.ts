/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isBookDetailsOrBookHomePage: false,
  bookInformation: {
    id: '',
    title: '',
    author: '',
    genres: [],
    language: '',
    description: '',
    condition: '',
    coverPhotoUrls: [],
    owner: {
      id: '',
      name: '',
    },
    swapCondition: {
      swapType: '',
      giveAway: false,
      openForOffers: false,
      swappableGenres: [],
      swappableBooks: [],
    },
  },
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<any>) => {
      state.bookInformation = { ...initialState.bookInformation, ...action.payload };
    },
    setBookDetailsOrBookHomePage: (state, action: PayloadAction<boolean>) => {
      state.isBookDetailsOrBookHomePage = action.payload;
    },
  },
});

export const { setBook, setBookDetailsOrBookHomePage } = bookSlice.actions;
export default bookSlice.reducer;
