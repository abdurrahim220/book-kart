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

// lib/formFields.ts
export const bookFormFields = {
  bookDetails: [
    {
      name: "title",
      label: "Ad Title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      label: "Book Type",
      type: "select",
      options: [
        "College Books (Higher Education Textbooks)",
        "Exam/Test Preparation Books",
        "Reading Books (Novels, Children, Business, Literature, History, etc.)",
        "School Books (up to 12th)",
      ],
      required: true,
    },
    {
      name: "condition",
      label: "Book Condition",
      type: "radio",
      options: ["Excellent", "Good", "Fair"],
      required: true,
    },
    {
      name: "classType",
      label: "For Class",
      type: "select",
      options: [
        "B.Tech",
        "B.Sc",
        "B.Com",
        "BCA",
        "MBA",
        "M.Tech",
        "M.Sc",
        "Ph.D",
        "12th",
        "11th",
        "10th",
        "9th",
        "8th",
        "7th",
        "6th",
        "5th",
        "4th",
        "3rd",
        "2nd",
        "1st",
        "Others",
      ],
      required: true,
    },
    {
      name: "subject",
      label: "Book Title/Subject",
      type: "text",
      required: true,
    },
    {
      name: "images",
      label: "Upload Photos",
      type: "file",
      required: true,
    },
  ],
  optionalDetails: [
    {
      name: "price",
      label: "MRP",
      type: "number",
      required: false,
    },
    {
      name: "author",
      label: "Author",
      type: "text",
      required: false,
    },
    {
      name: "edition",
      label: "Edition (Year)",
      type: "text",
      required: false,
    },
    {
      name: "description",
      label: "Ad Description",
      type: "textarea",
      required: false,
    },
  ],
  pricingDetails: [
    {
      name: "discount",
      label: "Discount (%)",
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
      name: "shippingCharge",
      label: "Enter shipping charges",
      type: "number",
      required: false,
    },
  ],
};
