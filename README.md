# Astra Hotel — Система бронирования

Fullstack веб-приложение для онлайн-бронирования номеров отеля.

## Стек

- Frontend: Next.js 15 + TypeScript + TailwindCSS → Vercel
- Backend: NestJS + Prisma + PostgreSQL + JWT → Railway
- База данных: PostgreSQL (Neon)

## Демо

- Сайт: https://astra-hotel.vercel.app
- API Docs: https://astra-hotel-backend.up.railway.app/api/docs

## Тестовые аккаунты

- Admin: admin@astrahotel.com / admin123
- User: user@astrahotel.com / user123

## Локальный запуск

### Backend

cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev

### Frontend

cd frontend
npm install
npm run dev

## Функционал

- Регистрация и вход через JWT + HTTP-only cookies
- Просмотр номеров с фильтрацией
- Бронирование номеров с выбором дат и расчётом стоимости
- Личный кабинет с историей бронирований
- Отмена бронирований
- Панель администратора — управление номерами и бронированиями
- Swagger документация API на /api/docs
- Защита маршрутов через middleware
- Роли USER и ADMIN

## Структура проекта

astra-hotel/
├── frontend/ — Next.js приложение
└── backend/ — NestJS API сервер

