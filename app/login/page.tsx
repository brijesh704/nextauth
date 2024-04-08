"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const page: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    </div>
  );
};

export default page;
