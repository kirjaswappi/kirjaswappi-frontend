import * as yup from "yup";

const bookDetails = yup.object().shape({
  title: yup.string().min(20).required("Book title is required"),
  author: yup.string().required("Author name is required"),
  description: yup.string().required("Description is required"),
  language: yup.string().required("Language is required"),
  condition: yup.string().required("Condition is required")
});

const otherDetails = yup.object().shape({
  favGenres: yup.array()
    .of(yup.string())
    .min(1, "Please select at least one genre.")
    .required("Genres are required."),
});
const conditionDetails = yup.object().shape({
  conditionType: yup.string().required("Condition type is required"),
  
});


export const validationSchemas = [bookDetails, otherDetails, conditionDetails];
