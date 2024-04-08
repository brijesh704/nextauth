"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import InputField from "./InputField";
import DateInput from "./DateInput";
import { useMutation } from "react-query";

import axiosInstance from "./axiosInstance";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  dob: yup
    .date()
    .required("Date of birth is required")
    .test("age", "You must be at least 16 years old", function (value) {
      const cutoffDate = new Date();
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 16);
      return value && value <= cutoffDate;
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupForm: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  // const methods = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // });

  // const { handleSubmit } = methods;

  // const handleFormSUbmit = async (data: FormData) => {
  //   console.log("Form submitted with data:", data);
  //   try {
  //     const dob = data.dob.toISOString();

  //     const formData = new FormData();
  //     formData.append("firstName", data.firstName);
  //     formData.append("lastName", data.lastName);
  //     formData.append("email", data.email);
  //     formData.append("password", data.password);
  //     formData.append("confirmPassword", data.confirmPassword);
  //     formData.append("dob", dob);

  //     const response = await axiosInstance.post("/auth/register", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     const { accessToken } = response.data;
  //     localStorage.setItem("accessToken", accessToken);
  //     if (response.status === 200) {
  //       setSignupMessage(
  //         "Thank you for signing up! An email verification link has been sent to your email address."
  //       );
  //       setIsSignup(true);
  //     }
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //   }
  // };

  // const Data = {
  //   firstName: "string",
  //   firstName: "string",
  //   email: "string",
  //   // dob: Date;
  //   password: "string",
  //   confirmPassword: "string",
  // };
  // console.log(handleFormSUbmit(Data));

  const [formValue, setFormValue] = useState<FormData>();

  const { mutate: sunbmitButton } = useMutation({
    mutationFn: async () =>
      axiosInstance.post("auth/register", {
        firstName: formValue?.firstName,
        lastName: formValue?.lastName,
        email: formValue?.email,
        dob: formValue?.dob,
        password: formValue?.password,
        confirmPassword: formValue?.confirmPassword,
      }),
    onSuccess: (response: any) => {
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      if (response.status === 200) {
        setSignupMessage(
          "Thank you for signing up! An email verification link has been sent to your email address."
        );
        setIsSignup(true);
      }
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const methods = useForm<FormData>({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const handleFormSUbmit = (data: FormData) => {
    console.log(data, "formmmm data");
    setFormValue(data);
    sunbmitButton();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        {!isSignup ? (
          <FormProvider {...methods}>
            <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
            <InputField label="First Name" type="text" name="firstName" />
            <InputField label="Last Name" type="text" name="lastName" />
            <InputField label="Email" type="email" name="email" />
            <DateInput label="Date of Birth" name="dob" />
            <InputField label="Password" type="password" name="password" />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
            />

            <div className="mt-6">
              <button
                onClick={handleSubmit(handleFormSUbmit)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </FormProvider>
        ) : (
          <div>
            <p>{signupMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
