"use client"
import { useState } from "react";
import LoginCard from "@/app/components/LoginCard/loginCard";

export default function Login() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <LoginCard></LoginCard>
    </div>
  );
};

