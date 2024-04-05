"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleError } from "../components/errorHandler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },

    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: FormData) => {
    console.log(data, "fromdataaaaaaaaaaaa");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );
      console.log(data);
      const { accessToken } = response.data;
      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
      handleError(error);
    }
    router.push("/dashboard");
  };

  const handleBlur = async () => {
    await trigger();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-8">Log in</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            onBlur={handleBlur}
            dirtyFields={dirtyFields}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register("password")}
            error={errors.password?.message}
            onBlur={handleBlur}
            dirtyFields={dirtyFields}
          />

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
      </div>
    </div>
  );
};

export default LoginForm;
