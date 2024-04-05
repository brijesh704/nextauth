"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import InputField from "./InputField";
import DateInput from "./DateInput";

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
  const [isSignup, setisSignup] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },

    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: FormData) => {
    console.log(data, "fromdataaaaaaaaaaaa");

    try {
      const dob = data.dob.toISOString();

      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("dob", dob);

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      const { accessToken } = response.data;
      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      if (response.status === 200) {
        setSignupMessage(
          "Thank you for signing up! An email verification link has been sent to your email address."
        );
        setisSignup(true);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        {!isSignup ? (
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <h2 className="text-2xl font-bold mb-8">Sign Up</h2>
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              register={register("firstName")}
              error={errors.firstName?.message}
              onBlur={() => trigger()}
              dirtyFields={dirtyFields}
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              register={register("lastName")}
              error={errors.lastName?.message}
              onBlur={() => trigger()}
              dirtyFields={dirtyFields}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register("email")}
              error={errors.email?.message}
              onBlur={() => trigger()}
              dirtyFields={dirtyFields}
            />
            <DateInput
              control={control}
              name="dob"
              label="Date of Birth"
              error={errors.dob?.message}
              onBlur={() => trigger()}
              dirtyFields={dirtyFields}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              register={register("password")}
              error={errors.password?.message}
              onBlur={() => trigger()}
              dirtyFields={dirtyFields}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
              onBlur={() => trigger()}
              dirtyFields={dirtyFields}
            />

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
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
