import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{ backgroundColor: "#f5efe6", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-4 text-center"
    >
      <div style={{ color: "#c9a87c" }} className="text-9xl font-semibold mb-4">
        404
      </div>
      <h1 style={{ color: "#3d2b1f" }} className="text-2xl font-semibold mb-3">
        Страница не найдена
      </h1>
      <p style={{ color: "#7a5c45" }} className="text-sm mb-8">
        Похоже эта страница не существует. Вернитесь на главную.
      </p>
      <Link
        href="/"
        style={{ backgroundColor: "#c9a87c" }}
        className="text-white px-8 py-3 rounded-xl text-sm hover:opacity-90 transition"
      >
        На главную
      </Link>
    </div>
  );
}
