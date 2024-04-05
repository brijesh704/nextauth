"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EmailVerificationPage = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      console.log("API hit for email verification");
      console.log(token);

      try {
        const response = await axios.get(
          `http://localhost:8080/auth/verifyemail/${token}`
        );

        if (response.status === 200) {
          setVerificationStatus("Email verified successfully!");
          router.push("/login");
        } else {
          setVerificationStatus("Email verification failed.");
        }
      } catch (error) {
        setVerificationStatus("Email verification failed.");
        console.error("Error verifying email:", error);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl text-center text-gray-800">
        {verificationStatus}
      </h2>
    </div>
  );
};

export default EmailVerificationPage;
