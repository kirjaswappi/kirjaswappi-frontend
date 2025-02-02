import * as yup from "yup";

const bookDetails = yup.object().shape({
  title: yup.string().min(10).required("Book title is required"),
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
  bookCover: yup.mixed().test("required", "Book Cover is required.", (file) =>{
    if(file) return true
    return false
  })
});
const conditionDetails = yup.object().shape({
  conditionType: yup.string().required("Condition type is required"),
  bookTitle: yup.string().when("conditionType", {
    is: "byBook",
    then: () => yup.string().required("Book title is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  authorName: yup.string().when("conditionType", {
    is: "byBook",
    then: () => yup.string().required("Author name is required"),
  }),
  favGenres: yup.array()
  .of(yup.string()).when("conditionType", {
    is:"byGenre",
    then: () => yup.array().min(1, "Please select at least one genre."),
    
  })
});

export const validationSchemas = [bookDetails, otherDetails, conditionDetails];
