import { BookingStatus } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, role: string) {
    const where = role === 'ADMIN' ? {} : { userId };
    return this.prisma.booking.findMany({
      where,
      include: {
        room: {
          select: { id: true, title: true, imageUrl: true, price: true },
        },
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    if (!booking) throw new NotFoundException('Бронирование не найдено');
    if (role !== 'ADMIN' && booking.userId !== userId) {
      throw new NotFoundException('Бронирование не найдено');
    }
    return booking;
  }

  async create(
    userId: string,
    body: {
      roomId: string;
      checkIn: string;
      checkOut: string;
    },
  ) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });
    if (!room) throw new NotFoundException('Номер не найден');
    if (room.status === 'booked') {
      throw new BadRequestException('Номер уже забронирован');
    }

    const checkIn = new Date(body.checkIn);
    const checkOut = new Date(body.checkOut);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (nights <= 0) throw new BadRequestException('Неверные даты');

    const totalPrice = room.price * nights;

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        roomId: body.roomId,
        checkIn,
        checkOut,
        totalPrice,
        status: 'pending',
      },
      include: { room: true },
    });

    await this.prisma.room.update({
      where: { id: body.roomId },
      data: { status: 'booked' },
    });

    return booking;
  }

  async updateStatus(id: string, status: string, userId: string, role: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Бронирование не найдено');

    if (role !== 'ADMIN' && booking.userId !== userId) {
      throw new NotFoundException('Бронирование не найдено');
    }

    if (role !== 'ADMIN' && status !== 'cancelled') {
      throw new BadRequestException('Вы можете только отменить бронирование');
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: status as BookingStatus },
    });

    if (status === 'cancelled') {
      await this.prisma.room.update({
        where: { id: booking.roomId },
        data: { status: 'available' },
      });
    }

    return updated;
  }

  async remove(id: string, userId: string, role: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Бронирование не найдено');
    if (role !== 'ADMIN' && booking.userId !== userId) {
      throw new NotFoundException('Бронирование не найдено');
    }
    return this.prisma.booking.delete({ where: { id } });
  }
}
