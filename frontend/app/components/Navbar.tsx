"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    apiFetch<User>("/api/auth/me")
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.replace("/login");
  }

  return (
    <nav
      style={{ borderBottom: "1px solid #e8d5c0", backgroundColor: "#fff" }}
      className="px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm"
    >
      <Link href="/" className="flex items-center gap-3">
        <div
          style={{ backgroundColor: "#c9a87c" }}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        >
          A
        </div>
        <div>
          <div
            style={{ color: "#3d2b1f" }}
            className="font-semibold text-lg leading-none"
          >
            Astra Hotel
          </div>
          <div style={{ color: "#c9a87c" }} className="text-xs">
            5 звёзд · Алматы
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="/rooms"
          style={{ color: "#7a5c45" }}
          className="text-sm hover:text-amber-700 transition"
        >
          Номера
        </Link>
        <Link
          href="/#about"
          style={{ color: "#7a5c45" }}
          className="text-sm hover:text-amber-700 transition"
        >
          О нас
        </Link>
        <Link
          href="/#contacts"
          style={{ color: "#7a5c45" }}
          className="text-sm hover:text-amber-700 transition"
        >
          Контакты
        </Link>
        {user?.role === "ADMIN" && (
          <Link
            href="/admin"
            style={{ color: "#c9a87c" }}
            className="text-sm font-medium hover:underline"
          >
            Панель ADMIN
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 transition"
            >
              <div
                style={{ backgroundColor: "#c9a87c" }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                {user.name[0].toUpperCase()}
              </div>
              <span
                style={{ color: "#3d2b1f" }}
                className="text-sm hidden sm:block"
              >
                {user.name}
              </span>
            </Link>
            <button
              onClick={logout}
              style={{ color: "#e06b6b" }}
              className="text-sm hover:underline transition"
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{ border: "1px solid #c9a87c", color: "#c9a87c" }}
              className="text-sm px-4 py-2 rounded-lg hover:bg-amber-50 transition"
            >
              Войти
            </Link>
            <Link
              href="/register"
              style={{ backgroundColor: "#c9a87c" }}
              className="text-sm px-4 py-2 rounded-lg text-white hover:opacity-90 transition"
            >
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
