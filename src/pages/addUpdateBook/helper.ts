// import { BYBOOKS } from "../../utility/ADDBOOKCONDITIONTYPE";
// import { IBookDataType } from './interface/index';


// export const getDefaultValues = (bookData?: IBookDataType) => ({
//   books: (bookData?.swapCondition?.swappableBooks ?? []).length > 0
//     ? bookData.swapCondition.swappableBooks!.map(book => ({
//         bookTitle: book.title || "",
//         authorName: book.author || "",
//         byBookCover: book.coverPhotoUrl || null,
//       }))
//     : [{ bookTitle: "", authorName: "", byBookCover: null }],
    
//   // For other properties
//   favGenres: bookData?.genres || [],
//   conditionType: bookData?.swapCondition?.conditionType || 'BY_BOOKS',
//   language: bookData?.language || "",
//   title: bookData?.title || "",
//   genres: (bookData?.exchangeCondition?.exchangeableGenres ?? []).map(g => g?.name) || [],
//   condition: bookData?.condition || "",
//   description: bookData?.description || "",
//   author: bookData?.author || "",
//   bookCovers: bookData?.coverPhotoUrls || [],
// });