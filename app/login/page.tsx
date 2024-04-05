"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { useRouter } from "next/navigation";

const page: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
