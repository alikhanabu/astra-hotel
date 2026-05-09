"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
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

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    apiFetch<{ data: Room[] }>("/api/rooms?limit=20")
      .then((res) => setRooms(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = rooms.filter((r) => {
    if (filter === "available") return r.status === "available";
    return true;
  });

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
            className="text-4xl font-semibold mt-2 mb-3"
          >
            Выберите идеальный номер
          </h1>
          <p style={{ color: "#7a5c45" }} className="text-base mb-10">
            От уютного стандарта до роскошного президентского люкса
          </p>

          <div
            style={{ border: "1px solid #e8d5c0" }}
            className="bg-white rounded-2xl p-5 flex gap-4 flex-wrap items-end shadow-sm"
          >
            {["checkIn", "checkOut"].map((field) => (
              <div key={field} className="flex flex-col flex-1 min-w-28">
                <label
                  className="text-xs font-medium uppercase tracking-wide mb-1"
                  style={{ color: "#a08060" }}
                >
                  {field === "checkIn" ? "Заезд" : "Выезд"}
                </label>
                <input
                  type="date"
                  className="border-none outline-none text-sm bg-transparent py-1"
                  style={{ color: "#3d2b1f" }}
                />
              </div>
            ))}
            <div className="flex flex-col flex-1 min-w-20">
              <label
                className="text-xs font-medium uppercase tracking-wide mb-1"
                style={{ color: "#a08060" }}
              >
                Гостей
              </label>
              <input
                type="number"
                defaultValue={2}
                min={1}
                max={8}
                className="border-none outline-none text-sm bg-transparent py-1 w-full"
                style={{ color: "#3d2b1f" }}
              />
            </div>
            <button
              style={{ backgroundColor: "#c9a87c" }}
              className="text-white text-sm px-8 py-3 rounded-xl hover:opacity-90 transition whitespace-nowrap font-medium"
            >
              Найти
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <p style={{ color: "#7a5c45" }} className="text-sm">
            Найдено {filtered.length} номеров
          </p>
          <div className="flex gap-2">
            {[
              { key: "all", label: "Все" },
              { key: "available", label: "Свободные" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  border: "1px solid #e8d5c0",
                  backgroundColor: filter === f.key ? "#c9a87c" : "transparent",
                  color: filter === f.key ? "#fff" : "#7a5c45",
                }}
                className="text-sm px-5 py-2 rounded-full transition hover:opacity-80"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{ backgroundColor: "#f9f6f2" }}
                className="rounded-2xl h-72 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((room) => (
              <div
                key={room.id}
                style={{ border: "1px solid #e8d5c0" }}
                className="rounded-2xl overflow-hidden hover:shadow-md transition group bg-white"
              >
                <div className="relative h-44">
                  <Image
                    src={
                      room.imageUrl ||
                      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
                    }
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div
                    style={{
                      backgroundColor:
                        room.status === "available" ? "#5caa7f" : "#e06b6b",
                    }}
                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full border-2 border-white"
                  />
                </div>
                <div className="p-4">
                  <div
                    style={{ color: "#3d2b1f" }}
                    className="font-medium mb-1"
                  >
                    {room.title}
                  </div>
                  <div style={{ color: "#a08060" }} className="text-xs mb-3">
                    {room.capacity} гостя · {room.size} м²
                  </div>
                  <p
                    style={{ color: "#7a5c45" }}
                    className="text-xs mb-4 leading-relaxed line-clamp-2"
                  >
                    {room.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div
                      style={{ color: "#c9a87c" }}
                      className="font-semibold text-sm"
                    >
                      {room.price.toLocaleString()}
                      <span
                        style={{ color: "#a08060" }}
                        className="font-normal text-xs"
                      >
                        {" "}
                        ₸/ночь
                      </span>
                    </div>
                    {room.status === "available" ? (
                      <Link
                        href={`/rooms/${room.id}`}
                        style={{ backgroundColor: "#c9a87c" }}
                        className="text-xs px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition"
                      >
                        Подробнее
                      </Link>
                    ) : (
                      <span
                        style={{ color: "#e06b6b", backgroundColor: "#fdeaea" }}
                        className="text-xs px-3 py-1.5 rounded-lg"
                      >
                        Занято
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
