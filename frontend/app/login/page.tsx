"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#f9f6f2", minHeight: "100vh" }}>
      <Navbar />
      <main className="flex items-center justify-center px-4 py-20">
        <div
          style={{ border: "1px solid #e8d5c0", backgroundColor: "#fff" }}
          className="w-full max-w-md rounded-2xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              style={{ backgroundColor: "#c9a87c" }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            >
              A
            </div>
            <div>
              <div
                style={{ color: "#3d2b1f" }}
                className="font-semibold text-lg"
              >
                Astra Hotel
              </div>
              <div style={{ color: "#c9a87c" }} className="text-xs">
                Войти в аккаунт
              </div>
            </div>
          </div>

          <h1
            style={{ color: "#3d2b1f" }}
            className="text-2xl font-semibold mb-1"
          >
            Добро пожаловать
          </h1>
          <p style={{ color: "#a08060" }} className="text-sm mb-8">
            Войдите чтобы управлять бронированиями
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                style={{ color: "#7a5c45" }}
                className="block text-sm mb-2"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{ border: "1px solid #e8d5c0" }}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300 bg-white"
              />
            </div>
            <div>
              <label
                style={{ color: "#7a5c45" }}
                className="block text-sm mb-2"
              >
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ border: "1px solid #e8d5c0" }}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300 bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#c9a87c" }}
              className="w-full text-white font-medium rounded-xl py-3 text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>

          <div
            style={{ border: "1px solid #e8d5c0", backgroundColor: "#f9f6f2" }}
            className="rounded-xl p-4 mt-5 text-sm"
          >
            <div style={{ color: "#7a5c45" }} className="font-medium mb-2">
              Тестовые аккаунты:
            </div>
            <div style={{ color: "#a08060" }}>
              Admin: admin@astrahotel.com / admin123
            </div>
            <div style={{ color: "#a08060" }}>
              User: user@astrahotel.com / user123
            </div>
          </div>

          <p style={{ color: "#a08060" }} className="text-sm text-center mt-6">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              style={{ color: "#c9a87c" }}
              className="hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
