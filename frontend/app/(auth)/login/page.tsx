"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        const res = await api.post("/auth/login", {
            email,
            password,
        });
        console.log(res);
        localStorage.setItem("token", res.data.token)
        router.push("/dashboard");
    }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          className="w-full border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
