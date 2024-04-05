"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EmailVerificationPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  console.log(token, "tokennnnnnn");
  console.log(password, "passwordddddddd");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateStatus, setUpdateStatus] = useState("");

  const router = useRouter();
  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordUpdate = async () => {
    try {
      if (password !== confirmPassword) {
        setUpdateStatus("Passwords do not match.");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/auth/updatepassword`,
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
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handlePasswordUpdate}
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
