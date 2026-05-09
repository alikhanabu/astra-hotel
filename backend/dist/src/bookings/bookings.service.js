"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, role) {
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
    async findOne(id, userId, role) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                room: true,
                user: { select: { id: true, name: true, email: true } },
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Бронирование не найдено');
        if (role !== 'ADMIN' && booking.userId !== userId) {
            throw new common_1.NotFoundException('Бронирование не найдено');
        }
        return booking;
    }
    async create(userId, body) {
        const room = await this.prisma.room.findUnique({
            where: { id: body.roomId },
        });
        if (!room)
            throw new common_1.NotFoundException('Номер не найден');
        if (room.status === 'booked') {
            throw new common_1.BadRequestException('Номер уже забронирован');
        }
        const checkIn = new Date(body.checkIn);
        const checkOut = new Date(body.checkOut);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        if (nights <= 0)
            throw new common_1.BadRequestException('Неверные даты');
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
    async updateStatus(id, status, userId, role) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Бронирование не найдено');
        if (role !== 'ADMIN' && booking.userId !== userId) {
            throw new common_1.NotFoundException('Бронирование не найдено');
        }
        if (role !== 'ADMIN' && status !== 'cancelled') {
            throw new common_1.BadRequestException('Вы можете только отменить бронирование');
        }
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status: status },
        });
        if (status === 'cancelled') {
            await this.prisma.room.update({
                where: { id: booking.roomId },
                data: { status: 'available' },
            });
        }
        return updated;
    }
    async remove(id, userId, role) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Бронирование не найдено');
        if (role !== 'ADMIN' && booking.userId !== userId) {
            throw new common_1.NotFoundException('Бронирование не найдено');
        }
        return this.prisma.booking.delete({ where: { id } });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map