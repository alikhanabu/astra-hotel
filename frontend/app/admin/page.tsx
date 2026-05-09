"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { apiFetch } from "@/lib/api";

interface Room {
  id: string;
  title: string;
  price: number;
  capacity: number;
  size: number;
  status: string;
  imageUrl: string;
}
interface Booking {
  id: string;
  status: string;
  totalPrice: number;
  checkIn: string;
  checkOut: string;
  user: { name: string; email: string };
  room: { title: string; imageUrl: string };
}
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

export default function AdminPage() {
  const [tab, setTab] = useState<"rooms" | "bookings" | "users">("rooms");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState({
    title: "",
    description: "",
    price: "",
    capacity: "",
    size: "",
    imageUrl: "",
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ id: string; role: string }>("/api/auth/me")
      .then((u) => {
        if (u.role !== "ADMIN") window.location.href = "/dashboard";
      })
      .catch(() => {
        window.location.href = "/login";
      });

    Promise.all([
      fetch(`${BASE}/api/rooms?limit=50`)
        .then((r) => r.json())
        .then((r) => setRooms(r.data || [])),
      apiFetch<Booking[]>("/api/bookings").then(setBookings),
      apiFetch<User[]>("/api/users").then(setUsers),
    ]).finally(() => setLoading(false));
  }, []);

  async function createRoom(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      const room = await apiFetch<Room>("/api/rooms", {
        method: "POST",
        body: JSON.stringify({
          ...newRoom,
          price: Number(newRoom.price),
          capacity: Number(newRoom.capacity),
          size: Number(newRoom.size),
        }),
      });
      setRooms((prev) => [room, ...prev]);
      setNewRoom({
        title: "",
        description: "",
        price: "",
        capacity: "",
        size: "",
        imageUrl: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function deleteRoom(id: string) {
    if (!confirm("Удалить номер?")) return;
    await apiFetch(`/api/rooms/${id}`, { method: "DELETE" });
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }

  async function updateBookingStatus(id: string, status: string) {
    await apiFetch(`/api/bookings/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  }

  const statusMap: Record<
    string,
    { label: string; bg: string; color: string }
  > = {
    confirmed: { label: "Подтверждено", bg: "#e6f5ee", color: "#2d8a55" },
    pending: { label: "Ожидание", bg: "#faf0e0", color: "#b07820" },
    cancelled: { label: "Отменено", bg: "#fdeaea", color: "#c04040" },
  };

  return (
    <div style={{ backgroundColor: "#f9f6f2", minHeight: "100vh" }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ color: "#3d2b1f" }} className="text-2xl font-semibold">
              Панель администратора
            </h1>
            <p style={{ color: "#a08060" }} className="text-sm mt-1">
              Управление отелем Astra · Астана
            </p>
          </div>
          <Link
            href="/dashboard"
            style={{ color: "#c9a87c" }}
            className="text-sm hover:underline"
          >
            ← Назад
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Номеров", value: rooms.length },
            { label: "Бронирований", value: bookings.length },
            { label: "Пользователей", value: users.length },
          ].map((s) => (
            <div
              key={s.label}
              style={{ backgroundColor: "#fff", border: "1px solid #e8d5c0" }}
              className="rounded-2xl p-5 text-center"
            >
              <div
                style={{ color: "#c9a87c" }}
                className="text-3xl font-semibold"
              >
                {s.value}
              </div>
              <div style={{ color: "#7a5c45" }} className="text-sm mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {(["rooms", "bookings", "users"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                backgroundColor: tab === t ? "#c9a87c" : "#fff",
                color: tab === t ? "#fff" : "#7a5c45",
                border: "1px solid #e8d5c0",
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition"
            >
              {t === "rooms"
                ? "Номера"
                : t === "bookings"
                  ? "Бронирования"
                  : "Пользователи"}
            </button>
          ))}
        </div>

        {tab === "rooms" && (
          <div>
            <div
              style={{ border: "1px solid #e8d5c0", backgroundColor: "#fff" }}
              className="rounded-2xl p-6 mb-6"
            >
              <h2 style={{ color: "#3d2b1f" }} className="font-medium mb-5">
                Добавить номер
              </h2>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={createRoom} className="grid grid-cols-2 gap-4">
                {[
                  { key: "title", label: "Название", placeholder: "Делюкс" },
                  {
                    key: "price",
                    label: "Цена (₸/ночь)",
                    placeholder: "14500",
                    type: "number",
                  },
                  {
                    key: "capacity",
                    label: "Вместимость",
                    placeholder: "2",
                    type: "number",
                  },
                  {
                    key: "size",
                    label: "Площадь (м²)",
                    placeholder: "40",
                    type: "number",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      style={{ color: "#7a5c45" }}
                      className="block text-xs mb-1"
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type || "text"}
                      value={(newRoom as any)[f.key]}
                      onChange={(e) =>
                        setNewRoom((p) => ({ ...p, [f.key]: e.target.value }))
                      }
                      placeholder={f.placeholder}
                      required
                      style={{ border: "1px solid #e8d5c0" }}
                      className="w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-300 bg-white"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label
                    style={{ color: "#7a5c45" }}
                    className="block text-xs mb-1"
                  >
                    URL фото (с Unsplash)
                  </label>
                  <input
                    type="url"
                    value={newRoom.imageUrl}
                    onChange={(e) =>
                      setNewRoom((p) => ({ ...p, imageUrl: e.target.value }))
                    }
                    placeholder="https://images.unsplash.com/..."
                    style={{ border: "1px solid #e8d5c0" }}
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-300 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    style={{ color: "#7a5c45" }}
                    className="block text-xs mb-1"
                  >
                    Описание
                  </label>
                  <textarea
                    value={newRoom.description}
                    onChange={(e) =>
                      setNewRoom((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Описание номера..."
                    rows={3}
                    style={{ border: "1px solid #e8d5c0" }}
                    className="w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-300 bg-white resize-none"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={creating}
                    style={{ backgroundColor: "#c9a87c" }}
                    className="text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                  >
                    {creating ? "Создаём..." : "+ Добавить номер"}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  style={{
                    border: "1px solid #e8d5c0",
                    backgroundColor: "#fff",
                  }}
                  className="rounded-2xl overflow-hidden"
                >
                  <div className="relative h-36">
                    <Image
                      src={
                        room.imageUrl ||
                        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
                      }
                      alt={room.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      style={{
                        backgroundColor:
                          room.status === "available" ? "#5caa7f" : "#e06b6b",
                      }}
                      className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 border-white"
                    />
                  </div>
                  <div className="p-4">
                    <div
                      style={{ color: "#3d2b1f" }}
                      className="font-medium text-sm mb-1"
                    >
                      {room.title}
                    </div>
                    <div style={{ color: "#a08060" }} className="text-xs mb-3">
                      {room.capacity} гостей · {room.size} м²
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        style={{ color: "#c9a87c" }}
                        className="text-sm font-medium"
                      >
                        {room.price.toLocaleString()} ₸
                      </div>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        style={{ color: "#e06b6b" }}
                        className="text-xs hover:underline"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="flex flex-col gap-3">
            {bookings.length === 0 && (
              <div className="text-center py-10" style={{ color: "#a08060" }}>
                Бронирований пока нет
              </div>
            )}
            {bookings.map((b) => {
              const s = statusMap[b.status] || statusMap.pending;
              return (
                <div
                  key={b.id}
                  style={{
                    border: "1px solid #e8d5c0",
                    backgroundColor: "#fff",
                  }}
                  className="rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        b.room.imageUrl ||
                        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400"
                      }
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      style={{ color: "#3d2b1f" }}
                      className="font-medium text-sm"
                    >
                      {b.room.title}
                    </div>
                    <div
                      style={{ color: "#a08060" }}
                      className="text-xs mt-0.5"
                    >
                      {b.user.name} ·{" "}
                      {new Date(b.checkIn).toLocaleDateString("ru-RU")} —{" "}
                      {new Date(b.checkOut).toLocaleDateString("ru-RU")}
                    </div>
                    <div
                      style={{ color: "#c9a87c" }}
                      className="text-sm font-medium mt-1"
                    >
                      {b.totalPrice.toLocaleString()} ₸
                    </div>
                  </div>
                  <span
                    style={{ backgroundColor: s.bg, color: s.color }}
                    className="text-xs px-3 py-1.5 rounded-full font-medium flex-shrink-0"
                  >
                    {s.label}
                  </span>
                  {b.status === "pending" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateBookingStatus(b.id, "confirmed")}
                        style={{ backgroundColor: "#e6f5ee", color: "#2d8a55" }}
                        className="text-xs px-3 py-1.5 rounded-lg hover:opacity-80"
                      >
                        Подтвердить
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b.id, "cancelled")}
                        style={{ backgroundColor: "#fdeaea", color: "#c04040" }}
                        className="text-xs px-3 py-1.5 rounded-lg hover:opacity-80"
                      >
                        Отменить
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "users" && (
          <div className="flex flex-col gap-3">
            {users.map((u) => (
              <div
                key={u.id}
                style={{ border: "1px solid #e8d5c0", backgroundColor: "#fff" }}
                className="rounded-2xl p-5 flex items-center gap-4"
              >
                <div
                  style={{
                    backgroundColor: u.role === "ADMIN" ? "#3d2b1f" : "#c9a87c",
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
                >
                  {u.name[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div
                    style={{ color: "#3d2b1f" }}
                    className="font-medium text-sm"
                  >
                    {u.name}
                  </div>
                  <div style={{ color: "#a08060" }} className="text-xs">
                    {u.email}
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: u.role === "ADMIN" ? "#3d2b1f" : "#f5efe6",
                    color: u.role === "ADMIN" ? "#fff" : "#c9a87c",
                  }}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
