import { Mail, LockKeyhole, User } from "lucide-react";
export const fields = {
  login: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      icon: Mail,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      icon: LockKeyhole,
    },
  ],
  signup: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      icon: User,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      icon: Mail,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      icon: LockKeyhole,
    },
    {
      name: "agreeTerms",
      label: "I agree to the terms and conditions",
      type: "checkbox",
      required: true,
    },
  ],
  forgot: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      icon: Mail,
    },
  ],
  resetPassword: [
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      icon: LockKeyhole,
    },
    {
      name: "passwordConfirm",
      label: "Confirm Password",
      type: "password",
      required: true,
      icon: LockKeyhole,
    },
  ],
};

export const bookFormFields = {
  book: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "images",
      label: "Images",
      type: "file",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "condition",
      label: "Condition",
      type: "text",
      required: true,
    },
    {
      name: "classType",
      label: "Class Type",
      type: "text",
      required: true,
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      required: true,
    },
    {
      name: "author",
      label: "Author",
      type: "text",
      required: true,
    },
    {
      name: "edition",
      label: "Edition",
      type: "text",
      required: true,
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      required: false,
    },
    {
      name: "finalPrice",
      label: "Final Price",
      type: "number",
      required: true,
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      required: true,
    },
    {
      name: "rating",
      label: "Rating",
      type: "number",
      required: false,
    },
    {
      name: "reviews",
      label: "Reviews",
      type: "text",
      required: false,
    },
    {
      name: "shippingCharge",
      label: "Shipping Charge",
      type: "number",
      required: true,
    },
    {
      name: "seller",
      label: "Seller",
      type: "text",
      required: true,
    },
  ],
};
