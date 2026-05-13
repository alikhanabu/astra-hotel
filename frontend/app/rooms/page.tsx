"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

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

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE}/api/rooms?limit=20`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((res) => {
        console.log("Rooms response:", res);
        setRooms(res.data || []);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ backgroundColor: "#f5efe6" }} className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <span
            style={{ color: "#c9a87c" }}
            className="text-sm font-medium uppercase tracking-wide"
          >
            Наши номера
          </span>
          <h1
            style={{ color: "#3d2b1f" }}
            className="text-4xl font-semibold mt-2 mb-2"
          >
            Выберите идеальный номер
          </h1>
          <p style={{ color: "#7a5c45" }} className="text-base">
            От уютного эконома до роскошного президентского люкса в Астане
          </p>
        </div>
      </section>

      <section className="px-6 py-10 max-w-6xl mx-auto">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{ backgroundColor: "#f9f6f2" }}
                className="rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p style={{ color: "#e06b6b" }} className="text-sm mb-2">
              Ошибка загрузки: {error}
            </p>
            <p style={{ color: "#a08060" }} className="text-xs">
              URL: {BASE}/api/rooms
            </p>
          </div>
        )}

        {!loading && !error && rooms.length === 0 && (
          <div className="text-center py-20">
            <p
              style={{ color: "#3d2b1f" }}
              className="text-lg font-medium mb-2"
            >
              Номеров пока нет
            </p>
            <p style={{ color: "#a08060" }} className="text-sm">
              Добавьте номера через панель администратора
            </p>
            <Link
              href="/admin"
              style={{ backgroundColor: "#c9a87c" }}
              className="inline-block mt-4 text-white px-6 py-2 rounded-xl text-sm"
            >
              Панель ADMIN
            </Link>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                style={{ border: "1px solid #e8d5c0" }}
                className="rounded-2xl overflow-hidden hover:shadow-xl transition group bg-white"
              >
                <div className="relative h-52">
                  <Image
                    src={
                      room.imageUrl ||
                      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
                    }
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                  <div
                    style={{
                      backgroundColor:
                        room.status === "available" ? "#5caa7f" : "#e06b6b",
                    }}
                    className="absolute top-3 right-3 text-white text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    {room.status === "available" ? "Свободен" : "Занят"}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      style={{ color: "#3d2b1f" }}
                      className="font-semibold text-lg"
                    >
                      {room.title}
                    </h3>
                    <div
                      style={{ color: "#c9a87c" }}
                      className="font-semibold text-base whitespace-nowrap ml-2"
                    >
                      {room.price.toLocaleString()} ₸
                      <span
                        style={{ color: "#a08060" }}
                        className="font-normal text-xs"
                      >
                        /ночь
                      </span>
                    </div>
                  </div>
                  <div style={{ color: "#a08060" }} className="text-xs mb-3">
                    {room.capacity} {room.capacity === 1 ? "гость" : "гостя"} ·{" "}
                    {room.size} м²
                  </div>
                  <p
                    style={{ color: "#7a5c45" }}
                    className="text-xs mb-4 leading-relaxed line-clamp-2"
                  >
                    {room.description}
                  </p>
                  {room.status === "available" ? (
                    <Link
                      href={`/rooms/${room.id}`}
                      style={{ backgroundColor: "#c9a87c" }}
                      className="block text-center text-white text-sm py-2.5 rounded-xl hover:opacity-90 transition font-medium"
                    >
                      Подробнее и забронировать
                    </Link>
                  ) : (
                    <div
                      style={{ backgroundColor: "#fdeaea", color: "#c04040" }}
                      className="text-center text-sm py-2.5 rounded-xl font-medium"
                    >
                      Занято
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
