import * as Yup from "yup";

export const productSchema = Yup.object({
    name: Yup.string()
    .trim()
    .min(3,"Minimum 3 characters required")
    .required("Product name is required"),

    price: Yup.number()
    .typeError("Price must be a number")
    .positive("Must be greater than 0")
    .required("Price of the product is required"),

    category: Yup.string()
    .trim()
    .required("enter a category"),

    image: Yup.mixed()
    .required("Image URL is required"),
});

