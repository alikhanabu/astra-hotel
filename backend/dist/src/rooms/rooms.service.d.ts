import { PrismaService } from '../prisma/prisma.service';
export declare class RoomsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        page?: number;
        limit?: number;
        status?: string;
        minPrice?: number;
        maxPrice?: number;
        capacity?: number;
    }): Promise<{
        data: {
            id: string;
            title: string;
            description: string | null;
            price: number;
            capacity: number;
            size: number;
            imageUrl: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        bookings: {
            status: import(".prisma/client").$Enums.BookingStatus;
            checkIn: Date;
            checkOut: Date;
        }[];
    } & {
        id: string;
        title: string;
        description: string | null;
        price: number;
        capacity: number;
        size: number;
        imageUrl: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: {
        title: string;
        description?: string;
        price: number;
        capacity: number;
        size: number;
        imageUrl?: string;
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        capacity: number;
        size: number;
        imageUrl: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: Partial<{
        title: string;
        description: string;
        price: number;
        capacity: number;
        size: number;
        imageUrl: string;
        status: 'available' | 'booked' | 'maintenance';
    }>): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        capacity: number;
        size: number;
        imageUrl: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        capacity: number;
        size: number;
        imageUrl: string | null;
        status: import(".prisma/client").$Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
