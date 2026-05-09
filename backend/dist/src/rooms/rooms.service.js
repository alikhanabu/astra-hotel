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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoomsService = class RoomsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.status)
            where.status = query.status;
        if (query.capacity)
            where.capacity = { gte: Number(query.capacity) };
        if (query.minPrice || query.maxPrice) {
            where.price = {};
            if (query.minPrice)
                where.price.gte = Number(query.minPrice);
            if (query.maxPrice)
                where.price.lte = Number(query.maxPrice);
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
    async findOne(id) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: {
                bookings: {
                    where: { status: { not: 'cancelled' } },
                    select: { checkIn: true, checkOut: true, status: true },
                },
            },
        });
        if (!room)
            throw new common_1.NotFoundException('Номер не найден');
        return room;
    }
    async create(data) {
        return this.prisma.room.create({ data });
    }
    async update(id, data) {
        return this.prisma.room.update({ where: { id }, data: data });
    }
    async remove(id) {
        return this.prisma.room.delete({ where: { id } });
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map