"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;

      const response = await axios.post(
        `${process.env.URL}/auth/forgot-password`,
        { email }
      );
      if (response.status === 200) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error("Error initiating password reset:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Forgot Password</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
        {emailSent && (
          <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
            Email sent for password reset.
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
