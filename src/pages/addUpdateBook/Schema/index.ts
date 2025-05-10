import * as yup from "yup";
import { SUPPORTED_FORMATS } from "../../../utility/constant";

const FILE_SIZE = 10 * 1024 * 1024; // 10MB

const bookDetails = yup.object().shape({
  title: yup.string().required("Book title is required"),
  author: yup.string().required("Author name is required"),
  description: yup.string().required("Description is required"),
  language: yup.string().required("Language is required"),
  condition: yup.string().required("Condition is required"),
});

const imageSchema = yup
  .mixed<File | string>()
  .required("Image is required")
  .test("fileType", "Only JPG or PNG files are allowed", (value) => {
    if (typeof value === "string") return true;
    return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
  })
  .test("fileSize", "File size must be less than 10MB", (value) => {
    if (typeof value === "string") return true;
    return value instanceof File && value.size <= FILE_SIZE;
  })
  .test(
    "validUrlOrFile",
    "Must provide a valid image file or a non-empty image URL",
    (value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value instanceof File;
    }
  );
const otherDetails = yup.object().shape({
  favGenres: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one genre.")
    .required("Genres are required."),
  bookCovers: yup
  .array()
  .of(imageSchema)
  .min(1, "At least one image is required")

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
