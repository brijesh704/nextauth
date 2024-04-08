"use client";
import React, { useEffect } from "react";
import SignupForm from "../../components/SignupForm";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const page: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accesstoken = localStorage.getItem("accessToken");
      if (accesstoken) {
        router.push("/dashboard");
      }
    }
  }, []);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <SignupForm />
      </QueryClientProvider>
    </div>
  );
};

export default page;
