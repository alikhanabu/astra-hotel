import { PrismaService } from '../prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, role: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        room: {
            id: string;
            title: string;
            price: number;
            imageUrl: string | null;
        };
    } & {
        id: string;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string, userId: string, role: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        room: {
            id: string;
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            price: number;
            capacity: number;
            size: number;
            imageUrl: string | null;
        };
    } & {
        id: string;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(userId: string, body: {
        roomId: string;
        checkIn: string;
        checkOut: string;
    }): Promise<{
        room: {
            id: string;
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            price: number;
            capacity: number;
            size: number;
            imageUrl: string | null;
        };
    } & {
        id: string;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, status: string, userId: string, role: string): Promise<{
        id: string;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, userId: string, role: string): Promise<{
        id: string;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
