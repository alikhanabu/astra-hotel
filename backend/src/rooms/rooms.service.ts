import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    page?: number;
    limit?: number;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    capacity?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.capacity) where.capacity = { gte: Number(query.capacity) };
    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price.gte = Number(query.minPrice);
      if (query.maxPrice) where.price.lte = Number(query.maxPrice);
    }

    const [rooms, total] = await Promise.all([
      this.prisma.room.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.room.count({ where }),
    ]);

    return {
      data: rooms,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        bookings: {
          where: { status: { not: 'cancelled' } },
          select: { checkIn: true, checkOut: true, status: true },
        },
      },
    });
    if (!room) throw new NotFoundException('Номер не найден');
    return room;
  }

  async create(data: {
    title: string;
    description?: string;
    price: number;
    capacity: number;
    size: number;
    imageUrl?: string;
  }) {
    return this.prisma.room.create({ data });
  }

  async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      price: number;
      capacity: number;
      size: number;
      imageUrl: string;
      status: 'available' | 'booked' | 'maintenance';
    }>,
  ) {
    return this.prisma.room.update({ where: { id }, data: data as any });
  }
  async remove(id: string) {
    return this.prisma.room.delete({ where: { id } });
  }
}
