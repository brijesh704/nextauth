"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../components/InputField";

interface FormData {
  password: string;
  confirmPassword: string;
}

const EmailVerificationPage = () => {
  const [token, setToken] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  const methods = useForm<FormData>();
  const handlePasswordUpdate = async (formData: FormData) => {
    try {
      const { password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        setUpdateStatus("Passwords do not match.");
        return;
      }

      const response = await axios.post(
        `${process.env.URL}/auth/updatepassword`,
        { token, password }
      );

      if (response.status === 200) {
        setUpdateStatus("Password updated successfully!");
        router.push("/login");
      } else {
        setUpdateStatus("Password update failed.");
      }
    } catch (error) {
      setUpdateStatus("Password update failed.");
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Reset Password</h2>

        <FormProvider {...methods}>
          <InputField label="New Password" type="password" name="password" />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
          />
        </FormProvider>

        <div className="mb-4">
          <button
            onClick={methods.handleSubmit(handlePasswordUpdate)}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>
        </div>

        <p className="text-red-500">{updateStatus}</p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
