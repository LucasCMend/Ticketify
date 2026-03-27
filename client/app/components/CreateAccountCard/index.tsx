"use client";
import { createUser } from "@/app/service/user";
import { CreateUser } from "@/app/types/userTypes";
import { useState } from "react";

export default function CreateAccountCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle = "bg-slate-100 rounded-lg px-2 py-1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    const data: CreateUser = {
      name,
      email,
      password,
    };

    try {
      setIsLoading(true);
      const user = await createUser(data);
      console.log("Usuário criado com sucesso!", user);
      setName("")
      setEmail("")
      setPassword("")
      return alert("Usuário criado");
    } catch (error) {
      console.error("Erro na criação de usuário:", error);
      setError("Nome, E-mail ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <p>Nome Completo</p>
        <input
          className={inputStyle}
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>E-mail</p>
        <input
          className={inputStyle}
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>Password</p>
        <input
          className={inputStyle}
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          disabled={isLoading}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed w-full transition-colors"
        >
          Criar
        </button>
      </div>
    </form>
  );
}
