"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { apiFetch } from "@/lib/api";

interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  imageUrl: string;
  status: string;
}

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${BASE}/api/rooms/${id}`)
      .then((r) => r.json())
      .then(setRoom)
      .catch(() => router.replace("/rooms"))
      .finally(() => setLoading(false));
  }, [id]);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBooking(true);
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({ roomId: id, checkIn, checkOut }),
      });
      setSuccess("Бронирование успешно создано!");
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        window.location.href = "/login";
      } else {
        setError(err.message);
      }
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
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

  if (!room) return null;

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Link
          href="/rooms"
          style={{ color: "#c9a87c" }}
          className="text-sm hover:underline flex items-center gap-1 mb-8"
        >
          ← Назад к номерам
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="relative h-96 rounded-3xl overflow-hidden mb-4">
              <Image
                src={
                  room.imageUrl ||
                  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
                }
                alt={room.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1
                  style={{ color: "#3d2b1f" }}
                  className="text-3xl font-semibold mb-2"
                >
                  {room.title}
                </h1>
                <div style={{ color: "#a08060" }} className="text-sm">
                  {room.capacity} гостя · {room.size} м² · Астана
                </div>
              </div>
              <div
                style={{
                  backgroundColor:
                    room.status === "available" ? "#e6f5ee" : "#fdeaea",
                  color: room.status === "available" ? "#2d8a55" : "#c04040",
                }}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
              >
                {room.status === "available" ? "Свободен" : "Занят"}
              </div>
            </div>

            <p
              style={{ color: "#7a5c45" }}
              className="text-sm leading-relaxed mb-6"
            >
              {room.description}
            </p>

            <div
              style={{
                border: "1px solid #e8d5c0",
                backgroundColor: "#f9f6f2",
              }}
              className="rounded-2xl p-5 mb-6"
            >
              <div className="flex items-baseline gap-2">
                <span
                  style={{ color: "#c9a87c" }}
                  className="text-3xl font-semibold"
                >
                  {room.price.toLocaleString()} ₸
                </span>
                <span style={{ color: "#a08060" }} className="text-sm">
                  за ночь
                </span>
              </div>
            </div>

            {room.status === "available" && (
              <form onSubmit={handleBook} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3">
                    {success}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      style={{ color: "#7a5c45" }}
                      className="block text-sm mb-2"
                    >
                      Дата заезда
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      style={{ border: "1px solid #e8d5c0" }}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                  <div>
                    <label
                      style={{ color: "#7a5c45" }}
                      className="block text-sm mb-2"
                    >
                      Дата выезда
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      style={{ border: "1px solid #e8d5c0" }}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                </div>

                {nights > 0 && (
                  <div
                    style={{
                      backgroundColor: "#f9f6f2",
                      border: "1px solid #e8d5c0",
                    }}
                    className="rounded-xl p-4"
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "#7a5c45" }}>
                        {room.price.toLocaleString()} ₸ × {nights} ночей
                      </span>
                      <span
                        style={{ color: "#3d2b1f" }}
                        className="font-medium"
                      >
                        {(room.price * nights).toLocaleString()} ₸
                      </span>
                    </div>
                    <div
                      style={{ borderTop: "1px solid #e8d5c0" }}
                      className="flex justify-between pt-2"
                    >
                      <span
                        style={{ color: "#3d2b1f" }}
                        className="font-medium text-sm"
                      >
                        Итого
                      </span>
                      <span
                        style={{ color: "#c9a87c" }}
                        className="font-semibold"
                      >
                        {(room.price * nights).toLocaleString()} ₸
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={booking || !checkIn || !checkOut || nights <= 0}
                  style={{ backgroundColor: "#c9a87c" }}
                  className="w-full text-white font-medium rounded-xl py-4 text-sm hover:opacity-90 transition disabled:opacity-50"
                >
                  {booking
                    ? "Бронируем..."
                    : `Забронировать${nights > 0 ? ` — ${(room.price * nights).toLocaleString()} ₸` : ""}`}
                </button>

                <p style={{ color: "#a08060" }} className="text-xs text-center">
                  Нужно войти в аккаунт чтобы забронировать
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
