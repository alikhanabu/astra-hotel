import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Заполняем базу данных...');

  await prisma.booking.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

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

  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        title: 'Эконом',
        description:
          'Уютный номер для бюджетного отдыха. Всё необходимое для комфортного проживания в Астане.',
        price: 5900,
        capacity: 1,
        size: 18,
        imageUrl:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Стандарт',
        description:
          'Просторный номер с двуспальной кроватью, Wi-Fi и телевизором. Отличный выбор для пары.',
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
          'Улучшенный стандарт с видом на город и расширенным набором удобств.',
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
          'Просторный номер с балконом, завтраком, мини-баром и панорамным видом на Байтерек.',
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
        title: 'Семейный',
        description:
          'Две спальни, детская кроватка и игровая зона. Идеально для семьи с детьми.',
        price: 18000,
        capacity: 4,
        size: 55,
        imageUrl:
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
        status: 'available',
      },
    }),
    prisma.room.create({
      data: {
        title: 'Люкс',
        description:
          'Роскошный люкс с гостиной, джакузи и панорамным видом на ночную Астану.',
        price: 28000,
        capacity: 3,
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
          'Лучший номер отеля. Личный дворецкий, частная терраса с видом на ЭКСПО, всё включено.',
        price: 55000,
        capacity: 6,
        size: 110,
        imageUrl:
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
        status: 'available',
      },
    }),
  ]);

  await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: rooms[1].id,
      checkIn: new Date('2026-06-10'),
      checkOut: new Date('2026-06-15'),
      totalPrice: 8900 * 5,
      status: 'confirmed',
    },
  });

  console.log(`Создано ${rooms.length} номеров`);
  console.log('База данных заполнена успешно!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
