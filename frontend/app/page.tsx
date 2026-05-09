import Link from "next/link";
import Navbar from "./components/Navbar";
import Image from "next/image";

const features = [
  {
    title: "Бесплатный Wi-Fi",
    desc: "Высокоскоростной интернет во всех номерах",
  },
  { title: "Завтрак включён", desc: "Шведский стол с 7:00 до 10:30" },
  { title: "Бассейн и спа", desc: "Открытый бассейн и спа-центр" },
  { title: "Трансфер", desc: "Трансфер из аэропорта 24/7" },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{ backgroundColor: "#f5efe6" }}
        className="relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span
              style={{ backgroundColor: "#c9a87c" }}
              className="inline-block text-white text-xs px-4 py-1.5 rounded-full mb-6"
            >
              Премиум отель · 5 звёзд · Алматы
            </span>
            <h1
              style={{ color: "#3d2b1f" }}
              className="text-5xl font-semibold leading-tight mb-5"
            >
              Ваш идеальный
              <br />
              отдых начинается
              <br />
              здесь
            </h1>
            <p
              style={{ color: "#7a5c45" }}
              className="text-lg mb-10 leading-relaxed"
            >
              Роскошные номера, безупречный сервис
              <br />и незабываемые впечатления в сердце города.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/rooms"
                style={{ backgroundColor: "#c9a87c" }}
                className="text-white px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Смотреть номера
              </Link>
              <Link
                href="/#about"
                style={{ border: "1px solid #c9a87c", color: "#c9a87c" }}
                className="px-8 py-4 rounded-xl text-sm font-medium hover:bg-amber-50 transition"
              >
                Узнать больше
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div
              style={{ backgroundColor: "#e8d5b7" }}
              className="w-full h-80 rounded-3xl overflow-hidden relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"
                alt="Astra Hotel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="px-6 py-8 max-w-4xl mx-auto -mt-8 relative z-10">
        <div
          style={{ border: "1px solid #e8d5c0" }}
          className="bg-white rounded-2xl p-5 shadow-lg flex gap-4 flex-wrap items-end"
        >
          <div className="flex flex-col flex-1 min-w-28">
            <label
              className="text-xs font-medium uppercase tracking-wide mb-1"
              style={{ color: "#a08060" }}
            >
              Заезд
            </label>
            <input
              type="date"
              className="border-none outline-none text-sm bg-transparent py-1"
              style={{ color: "#3d2b1f" }}
            />
          </div>
          <div
            style={{
              width: 1,
              backgroundColor: "#e8d5c0",
              alignSelf: "stretch",
            }}
          />
          <div className="flex flex-col flex-1 min-w-28">
            <label
              className="text-xs font-medium uppercase tracking-wide mb-1"
              style={{ color: "#a08060" }}
            >
              Выезд
            </label>
            <input
              type="date"
              className="border-none outline-none text-sm bg-transparent py-1"
              style={{ color: "#3d2b1f" }}
            />
          </div>
          <div
            style={{
              width: 1,
              backgroundColor: "#e8d5c0",
              alignSelf: "stretch",
            }}
          />
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
          <Link
            href="/rooms"
            style={{ backgroundColor: "#c9a87c" }}
            className="text-white text-sm px-8 py-3 rounded-xl hover:opacity-90 transition whitespace-nowrap font-medium"
          >
            Найти номер
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: "Номеров", value: "50+" },
            { label: "Лет опыта", value: "10+" },
            { label: "Довольных гостей", value: "98%" },
            { label: "Рейтинг", value: "4.9 / 5" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: "#f9f6f2",
                border: "1px solid #e8d5c0",
              }}
              className="rounded-2xl p-6 text-center"
            >
              <div
                style={{ color: "#c9a87c" }}
                className="text-3xl font-semibold mb-1"
              >
                {s.value}
              </div>
              <div style={{ color: "#7a5c45" }} className="text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: "#f9f6f2" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2
            style={{ color: "#3d2b1f" }}
            className="text-3xl font-semibold text-center mb-12"
          >
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6"
                style={{ border: "1px solid #e8d5c0" }}
              >
                <div
                  style={{ backgroundColor: "#f5efe6", color: "#c9a87c" }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 font-bold"
                >
                  A
                </div>
                <div style={{ color: "#3d2b1f" }} className="font-medium mb-2">
                  {f.title}
                </div>
                <div
                  style={{ color: "#7a5c45" }}
                  className="text-sm leading-relaxed"
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div
              style={{ backgroundColor: "#f5efe6" }}
              className="w-full h-72 rounded-3xl overflow-hidden relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="О нас"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <span
              style={{ color: "#c9a87c" }}
              className="text-sm font-medium uppercase tracking-wide"
            >
              О нас
            </span>
            <h2
              style={{ color: "#3d2b1f" }}
              className="text-3xl font-semibold mt-2 mb-5"
            >
              Astra Hotel — место где каждый гость особенный
            </h2>
            <p
              style={{ color: "#7a5c45" }}
              className="text-base leading-relaxed mb-6"
            >
              Мы предлагаем уютные номера с современным дизайном, первоклассный
              сервис и незабываемые впечатления. Расположены в центре Алматы, в
              шаговой доступности от главных достопримечательностей.
            </p>
            <Link
              href="/rooms"
              style={{ backgroundColor: "#c9a87c" }}
              className="inline-block text-white px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
            >
              Забронировать номер
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contacts"
        style={{ backgroundColor: "#3d2b1f" }}
        className="px-6 py-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-white font-semibold text-xl mb-3">
              Astra Hotel
            </div>
            <div style={{ color: "#c9a87c" }} className="text-sm mb-1">
              5 звёзд · Алматы
            </div>
            <div style={{ color: "#a08060" }} className="text-sm">
              Проспект Достык 5, Алматы
            </div>
          </div>
          <div>
            <div style={{ color: "#c9a87c" }} className="font-medium mb-3">
              Контакты
            </div>
            <div style={{ color: "#a08060" }} className="text-sm space-y-1">
              <div>+7 (727) 123-45-67</div>
              <div>info@astrahotel.kz</div>
            </div>
          </div>
          <div>
            <div style={{ color: "#c9a87c" }} className="font-medium mb-3">
              Навигация
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/rooms"
                style={{ color: "#a08060" }}
                className="text-sm hover:text-white transition"
              >
                Номера
              </Link>
              <Link
                href="/login"
                style={{ color: "#a08060" }}
                className="text-sm hover:text-white transition"
              >
                Войти
              </Link>
              <Link
                href="/register"
                style={{ color: "#a08060" }}
                className="text-sm hover:text-white transition"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{ borderTop: "1px solid #5a3d2b" }}
          className="mt-10 pt-6 text-center"
        >
          <div style={{ color: "#a08060" }} className="text-sm">
            © 2026 Astra Hotel. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
