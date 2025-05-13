import { BYBOOKS } from "../../utility/ADDBOOKCONDITIONTYPE";
import { IBookData } from "./interface";

export const getDefaultValues = (bookData?: IBookData) => ({
  books: swappableBooks(bookData),
  favGenres: bookData?.genres || [],
  conditionType: bookData?.swapCondition?.conditionType || BYBOOKS,
  language: bookData?.language || "",
  title: bookData?.title || "",
  genres: exchangeableGenres(bookData),
  condition: bookData?.condition || "",
  description: bookData?.description || "",
  author: bookData?.author || "",
  bookCovers: bookData?.coverPhotoUrls || [],
});

// SWAPPABLE BOOKS
const swappableBooks = (bookData?: IBookData) =>
  bookData?.swapCondition?.swappableBooks?.map(
    ({ title, author, coverPhotoUrl }) => ({
      bookTitle: title || "",
      authorName: author || "",
      byBookCover: coverPhotoUrl || null,
    })
  ) || [{ bookTitle: "", authorName: "", byBookCover: null }];

const exchangeableGenres = (bookData?: IBookData) =>
  bookData?.exchangeCondition?.exchangeableGenres?.map(({ name }) => name) ||
  [];
