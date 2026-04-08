import { userLogin } from "@/app/service/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const response = await userLogin(email, password);
      console.log("Login realizado com sucesso!", response.data);
      router.push("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      setError("E-mail ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <p>E-mail</p>
        <input
          className="bg-slate-100 rounded-lg"
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
          className="bg-slate-100 rounded-lg"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600">
          Entrar
        </button>
      </div>
    </form>
  );
}
