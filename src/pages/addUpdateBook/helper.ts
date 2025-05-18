import {
    blobToBase64,
    convertedURLToFile,
    urlToDataUrl,
} from "../../utility/helper";
import { SwapType } from "./types/enum";
import { IAddUpdateBook, IBookData } from "./types/interface";

// DEFAULT VALUES
export const getDefaultValues = (bookData?: IBookData) => ({
  books: swappableBooks(bookData),
  favGenres: bookData?.genres || [],
  conditionType: bookData?.swapCondition?.conditionType || SwapType.BYBOOKS,
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

// EXCHANGEABLE GENRES
const exchangeableGenres = (bookData?: IBookData) =>
  bookData?.exchangeCondition?.exchangeableGenres?.map(({ name }) => name) ||
  [];

// <========= BUILD CREATE AND UPDATE BOOK FORM FUNCTION =========>

//  PROCESS BOOK COVERS FOR BASIC INFORMATION
const processBookCoversForBasicInformation = async (
  formData: FormData,
  covers: (File | string)[]
) => {
  const processCover = async (cover: File | string) => {
    if (cover instanceof File) return cover;
    if (typeof cover === "string") return convertedURLToFile(cover);
    return null;
  };
  const processedCovers = await Promise.all(covers.map(processCover));
  processedCovers.forEach(
    (cover) => cover && formData.append("coverPhotos", cover)
  );
};

// BASIC BOOK INFORMATION
const appendBasicBookInformation = (
  formData: FormData,
  data: IAddUpdateBook
) => {
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("description", data.description);
  formData.append("genres", data.favGenres.join(","));
  formData.append("language", data.language);
  formData.append("condition", data.condition);
};

// BOOK SWAP CONDITION INFORMATION
export const appendSwapConditionInformation = async (
  formData: FormData,
  data: IAddUpdateBook
) => {
  const swapCondition: Record<string, any> = {
    conditionType: data.conditionType,
    giveAway: false,
    openForOffers: false,
  };

  switch (data.conditionType) {
    case SwapType.BYBOOKS:
      swapCondition.books = await Promise.all(
        data.books.map(async (book) => ({
          title: book.bookTitle,
          author: book.authorName,
          coverPhoto:
            book.byBookCover instanceof File
              ? await blobToBase64(book.byBookCover)
              : await urlToDataUrl(book.byBookCover || ""),
        }))
      );
      break;

    case SwapType.OPENTOOFFERS:
      swapCondition.openForOffers = true;
      break;

    case SwapType.BYGENRES:
      swapCondition.genres = data.genres.join(",");
      break;

    case SwapType.GIVEAWAY:
      swapCondition.giveAway = true;
      break;
  }

  formData.append("swapCondition", JSON.stringify(swapCondition));
};

// <=========== FINAL BUILD FORM DATA FUNCTION ===========>
export const buildFormData = async (
  data: IAddUpdateBook,
  ownerId?: string,
  bookId?: string
): Promise<FormData> => {
  const formData = new FormData();

  // SET USER ID & BOOK ID IN FORM
  if (ownerId) formData.append("ownerId", ownerId);
  if (bookId) formData.append("id", bookId);

  // PASS BASIC INFORMATION TO THE (appendBasicBookInformation) -> FUNCTION
  appendBasicBookInformation(formData, data)
  // PASS SWAP CONDITION INFORMATION TO THE (appendSwapConditionInformation) -> FUNCTION
  await appendSwapConditionInformation(formData, data)
  // PASS BOOK COVER IMAGES TO THE (appendSwapConditionInformation) -> FUNCTION
  await processBookCoversForBasicInformation(formData, data.bookCovers)
  
  return formData
};
