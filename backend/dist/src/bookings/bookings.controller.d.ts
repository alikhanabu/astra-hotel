import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    create(req: any, body: any): Promise<{
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
    updateStatus(id: string, status: string, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
