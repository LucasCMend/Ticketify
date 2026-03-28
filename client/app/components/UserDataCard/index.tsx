"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { findMe } from "@/app/service/user";

export default function UserDataCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setError("");
      try {
        setIsLoading(true);
        const response = await findMe();
        const user: User = response.data;
        setEmail(user.email);
        setName(user.name);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          const backendMessage =
            (error.response?.data as { message?: string; error?: string })
              ?.message ||
            (error.response?.data as { message?: string; error?: string })
              ?.error ||
            "Erro ao buscar dados do perfil.";

          console.error("Erro ao buscar /users/me:", {
            status,
            url: error.config?.url,
            method: error.config?.method,
            message: backendMessage,
          });

          setError(`Erro ${status ?? "desconhecido"}: ${backendMessage}`);
        } else {
          console.error("Sessão inválida ou expirada:", error);
          setError("Sua sessão expirou. Por favor, faça login novamente.");
        }

        setName("");
        setEmail("");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Meu Perfil</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Nome */}
      <div className="mb-4">
        <label className="block text-sm text-slate-500 mb-1">Nome</label>
        {isEditing ? (
          <input
            className="w-full bg-slate-100 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="text-slate-800">{name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm text-slate-500 mb-1">Email</label>
        {isEditing ? (
          <input
            className="w-full bg-slate-100 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p className="text-slate-800">{email}</p>
        )}
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-3">
        {/* Editar / Salvar */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isEditing ? "Salvar alterações" : "Editar dados"}
        </button>

        {/* Redefinir senha */}
        <button
          disabled={isLoading}
          className="border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-100 transition"
        >
          Redefinir senha
        </button>
      </div>
    </div>
  );
}
