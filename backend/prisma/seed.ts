import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Заполняем базу данных...');

  // Очищаем таблицы перед заполнением
  await prisma.booking.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // Создаём пользователей
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Алихан Администратор',
      email: 'admin@astrahotel.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'Тестовый Гость',
      email: 'user@astrahotel.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Пользователи созданы:', admin.email, user.email);

  // Создаём номера
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        title: 'Стандарт',
        description:
          'Уютный номер с двуспальной кроватью, Wi-Fi и телевизором. Идеально для короткого отдыха.',
        price: 8900,
        capacity: 2,
        size: 28,
        imageUrl:
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Стандарт Плюс',
        description:
          'Улучшенный стандарт с видом на сад, зоной отдыха и расширенным набором удобств.',
        price: 11000,
        capacity: 2,
        size: 32,
        imageUrl:
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Делюкс',
        description:
          'Просторный номер с балконом, завтраком включён, мини-бар и халат.',
        price: 14500,
        capacity: 2,
        size: 40,
        imageUrl:
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Делюкс с видом',
        description:
          'Делюкс номер с панорамным видом на город. Романтическая атмосфера.',
        price: 17000,
        capacity: 3,
        size: 45,
        imageUrl:
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        status: 'booked',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Семейный',
        description:
          'Две спальни, детская кроватка и игровая зона. Всё для комфорта семьи.',
        price: 22000,
        capacity: 5,
        size: 58,
        imageUrl:
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Люкс',
        description:
          'Роскошный люкс с гостиной, джакузи и панорамным видом на город.',
        price: 28000,
        capacity: 4,
        size: 65,
        imageUrl:
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Президентский',
        description:
          'Лучший номер отеля. Личный дворецкий, панорамный вид, частный бассейн.',
        price: 45000,
        capacity: 6,
        size: 90,
        imageUrl:
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Студия',
        description:
          'Современная студия с кухонной зоной. Подходит для длительного проживания.',
        price: 9500,
        capacity: 2,
        size: 35,
        imageUrl:
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        status: 'available',
      },
    }),
  ]);

  console.log(`Создано ${rooms.length} номеров`);

  // Создаём тестовые бронирования
  await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: rooms[0].id,
      checkIn: new Date('2026-06-01'),
      checkOut: new Date('2026-06-05'),
      totalPrice: 8900 * 4,
      status: 'confirmed',
    },
  });

  await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: rooms[2].id,
      checkIn: new Date('2026-07-10'),
      checkOut: new Date('2026-07-15'),
      totalPrice: 14500 * 5,
      status: 'pending',
    },
  });

  console.log('Тестовые бронирования созданы');
  console.log('База данных заполнена успешно!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
