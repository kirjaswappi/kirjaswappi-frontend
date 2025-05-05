import * as yup from "yup";
import { SUPPORTED_FORMATS } from "../../../utility/constant";

const FILE_SIZE = 1 * 1024 * 1024; // 10MB


const bookDetails = yup.object().shape({
  title: yup.string().required("Book title is required"),
  author: yup.string().required("Author name is required"),
  description: yup.string().required("Description is required"),
  language: yup.string().required("Language is required"),
  condition: yup.string().required("Condition is required"),
});

const otherDetails = yup.object().shape({
  favGenres: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one genre.")
    .required("Genres are required."),
  // bookCovers: yup
  //   .mixed<File | string>()
  //   .required("Please upload a book cover.")
  //   .test("fileOrUrl", "Book cover is required", (value) => {
  //     return value !== null && !!value;
  //   })
  //   .test("fileValidation", "Invalid file format or size", (value) => {
  //     if (!value || typeof value === "string") return true; // Allow any URL

  //     // If it's a file, check size and format
  //     return (
  //       value instanceof File &&
  //       value.size <= FILE_SIZE &&
  //       SUPPORTED_FORMATS.includes(value.type)
  //     );
  //   }),
  bookCovers: yup
    .array()
    .of(
      yup
        .mixed<File | string>()
        .test("fileOrUrl", "Image is required", (value) => {
          return value !== null && !!value;
        })
        .test("fileValidation", "Invalid file format or size", (value) => {
          if (!value || typeof value === "string") return true;
          return (
            value instanceof File &&
            value.size <= FILE_SIZE &&
            SUPPORTED_FORMATS.includes(value.type)
          );
        })
    )
    .min(1, "Please upload at least one book cover.")
    .required("Book covers are required."),
});
const conditionDetails = yup.object().shape({
  conditionType: yup.string().required("Condition type is required"),
  books: yup.array().when("conditionType", {
    is: "ByBooks",
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            bookTitle: yup.string().required("Book title is required"),
            authorName: yup.string().required("Author name is required"),
            byBookCover: yup
              .mixed<File | string>()
              .required("Book cover is required")
              .test(
                "fileType",
                "Unsupported file format. Only JPG, PNG allowed.",
                (value) => {
                  if (typeof value === "string") return true; // skip if URL
                  if (value instanceof File) {
                    return SUPPORTED_FORMATS.includes(value.type);
                  }
                  return false;
                }
              )
              // File size validation
              .test(
                "fileSize",
                "File size must be less than 10MB.",
                (value) => {
                  if (typeof value === "string") return true; // skip if URL
                  if (value instanceof File) {
                    return value.size <= FILE_SIZE;
                  }
                  return false;
                }
              )
              // URL validation
              .test(
                "validUrlOrFile",
                "Must provide a valid image file or a non-empty image URL.",
                (value) => {
                  if (typeof value === "string") {
                    return value.trim() !== "";
                  }
                  return value instanceof File;
                }
              ),
          })
        )
        .min(1, "Please add at least one book"),
    otherwise: (schema) => schema.notRequired(),
  }),
  genres: yup
    .array()
    .of(yup.string())
    .when("conditionType", {
      is: "ByGenres",
      then: () => yup.array().min(1, "Please select at least one genre."),
    }),
});

export type IBookDetailsType = yup.InferType<typeof bookDetails>;
export type IOtherDetailsType = yup.InferType<typeof otherDetails>;
export type IConditionDetailsType = yup.InferType<typeof conditionDetails>;

export const validationSchemas = [bookDetails, otherDetails, conditionDetails];
