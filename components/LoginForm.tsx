"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "react-query";

import InputField from "./InputField";
import axiosInstance from "./axiosInstance";
import { handleError } from "../components/errorHandler";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const router = useRouter();

  // const methods = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // });

  // const { handleSubmit } = methods;

  // const handleFormSubmit = async (data: FormData) => {
  //   console.log("Form submitted with data:", data);
  //   try {
  //     const response = await axiosInstance.post("/auth/login", data);
  //     const { accessToken } = response.data;
  //     localStorage.setItem("accessToken", accessToken);
  //     toast.success("Logged in successfully!");
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     handleError(error);
  //   }
  //   router.push("/dashboard");
  // };

  const [formValue, setFormValue] = useState<FormData>();

  const { mutate: sunbmitButton } = useMutation({
    mutationFn: async () =>
      axiosInstance.post("/auth/login", {
        email: formValue?.email,

        password: formValue?.password,
      }),
    onSuccess: (response: any) => {
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Error logging in:", error);
      handleError(error);
    },
  });

  const methods = useForm<FormData>({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const handleFormSubmit = (data: FormData) => {
    console.log(data, "formmmm data");
    setFormValue(data);
    sunbmitButton();
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-8">Log in</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log in
              </button>
              <Link
                href={"/forgot"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                forgot password??
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginForm;
