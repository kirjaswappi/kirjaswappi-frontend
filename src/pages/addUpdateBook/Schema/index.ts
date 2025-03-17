import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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
  bookCover: yup
    .mixed<File | string>()
    .test("fileOrUrl", "Book cover is required", (value) => {
      return value !== null && !!value;
    })
    .test("fileValidation", "Invalid file format or size", (value) => {
      if (!value || typeof value === "string") return true; // Allow any URL

      // If it's a file, check size and format
      return (
        value instanceof File &&
        value.size <= FILE_SIZE &&
        SUPPORTED_FORMATS.includes(value.type)
      );
    }),
});
const conditionDetails = yup.object().shape({
  conditionType: yup.string().required("Condition type is required"),
  bookTitle: yup.string().when("conditionType", {
    is: "byBook",
    then: () => yup.string().required("Book title is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  byBookCover: yup.mixed<File>().when("conditionType", {
    is: "byBook",
    then: () =>
      yup
        .mixed<File>()
        .required("Book cover is required")
        .test(
          "fileSize",
          "File size must be less than 10MB",
          (value) => value instanceof File && value.size <= FILE_SIZE
        )
        .test(
          "fileType",
          "Unsupported file format. Only JPG, PNG allowed",
          (value) =>
            value instanceof File && SUPPORTED_FORMATS.includes(value.type)
        ),
    otherwise: () => yup.mixed().nullable().notRequired(),
  }),
  authorName: yup.string().when("conditionType", {
    is: "byBook",
    then: () => yup.string().required("Author name is required"),
  }),
  genres: yup
    .array()
    .of(yup.string())
    .when("conditionType", {
      is: "byGenre",
      then: () => yup.array().min(1, "Please select at least one genre."),
    }),
});

export const validationSchemas = [bookDetails, otherDetails, conditionDetails];
