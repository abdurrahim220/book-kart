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
