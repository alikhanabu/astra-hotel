import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private roomsService;
    constructor(roomsService: RoomsService);
    findAll(query: any): Promise<{
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
