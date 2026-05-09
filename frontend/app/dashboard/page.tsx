"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { apiFetch } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  room: { title: string; imageUrl: string; price: number };
}

const statusMap: Record<string, { label: string; bg: string; color: string }> =
  {
    confirmed: { label: "Подтверждено", bg: "#e6f5ee", color: "#2d8a55" },
    pending: { label: "Ожидание", bg: "#faf0e0", color: "#b07820" },
    cancelled: { label: "Отменено", bg: "#fdeaea", color: "#c04040" },
  };

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<User>("/api/auth/me"),
      apiFetch<Booking[]>("/api/bookings"),
    ])
      .then(([u, b]) => {
        setUser(u);
        setBookings(b);
      })
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, []);

  async function cancelBooking(id: string) {
    try {
      await apiFetch(`/api/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" }),
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: "#f9f6f2", minHeight: "100vh" }}>
        <Navbar />
        <div
          className="flex items-center justify-center py-40 text-sm"
          style={{ color: "#a08060" }}
        >
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9f6f2", minHeight: "100vh" }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-5 mb-10">
          <div
            style={{ backgroundColor: "#c9a87c" }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold"
          >
            {user?.name[0].toUpperCase()}
          </div>
          <div>
            <h1 style={{ color: "#3d2b1f" }} className="text-2xl font-semibold">
              {user?.name}
            </h1>
            <p style={{ color: "#a08060" }} className="text-sm">
              {user?.email}
            </p>
            <span
              style={{ backgroundColor: "#f5efe6", color: "#c9a87c" }}
              className="text-xs px-3 py-1 rounded-full font-medium mt-1 inline-block"
            >
              {user?.role}
            </span>
          </div>
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              style={{ backgroundColor: "#3d2b1f" }}
              className="ml-auto text-white text-sm px-5 py-3 rounded-xl hover:opacity-90 transition"
            >
              Панель администратора
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Всего бронирований", value: bookings.length },
            {
              label: "Подтверждено",
              value: bookings.filter((b) => b.status === "confirmed").length,
            },
            {
              label: "Ожидание",
              value: bookings.filter((b) => b.status === "pending").length,
            },
            {
              label: "Потрачено",
              value:
                bookings
                  .filter((b) => b.status !== "cancelled")
                  .reduce((s, b) => s + b.totalPrice, 0)
                  .toLocaleString() + " ₸",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{ backgroundColor: "#fff", border: "1px solid #e8d5c0" }}
              className="rounded-2xl p-5"
            >
              <div
                className="text-xs uppercase tracking-wide mb-1"
                style={{ color: "#a08060" }}
              >
                {s.label}
              </div>
              <div
                className="text-xl font-semibold"
                style={{ color: "#3d2b1f" }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 style={{ color: "#3d2b1f" }} className="text-lg font-semibold">
            Мои бронирования
          </h2>
          <Link
            href="/rooms"
            style={{ color: "#c9a87c" }}
            className="text-sm hover:underline"
          >
            Найти номер →
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div
            style={{ border: "2px dashed #e8d5c0" }}
            className="rounded-2xl p-16 text-center"
          >
            <p
              style={{ color: "#3d2b1f" }}
              className="font-medium text-lg mb-2"
            >
              Бронирований пока нет
            </p>
            <p style={{ color: "#a08060" }} className="text-sm mb-6">
              Найдите и забронируйте идеальный номер
            </p>
            <Link
              href="/rooms"
              style={{ backgroundColor: "#c9a87c" }}
              className="inline-block text-white px-6 py-3 rounded-xl text-sm hover:opacity-90 transition"
            >
              Смотреть номера
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((b) => {
              const s = statusMap[b.status] || statusMap.pending;
              const nights = Math.ceil(
                (new Date(b.checkOut).getTime() -
                  new Date(b.checkIn).getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              return (
                <div
                  key={b.id}
                  style={{
                    border: "1px solid #e8d5c0",
                    backgroundColor: "#fff",
                  }}
                  className="rounded-2xl p-5 flex items-center gap-5"
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={b.room.imageUrl}
                      alt={b.room.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{ color: "#3d2b1f" }}
                      className="font-medium mb-1"
                    >
                      {b.room.title}
                    </div>
                    <div style={{ color: "#a08060" }} className="text-xs">
                      {new Date(b.checkIn).toLocaleDateString("ru-RU")} —{" "}
                      {new Date(b.checkOut).toLocaleDateString("ru-RU")} ·{" "}
                      {nights} ночей
                    </div>
                    <div
                      style={{ color: "#c9a87c" }}
                      className="text-sm font-medium mt-1"
                    >
                      {b.totalPrice.toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      style={{ backgroundColor: s.bg, color: s.color }}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      {s.label}
                    </span>
                    {b.status === "pending" && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        style={{
                          color: "#e06b6b",
                          border: "1px solid #fca5a5",
                        }}
                        className="text-xs px-3 py-1.5 rounded-full hover:bg-red-50 transition"
                      >
                        Отменить
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
