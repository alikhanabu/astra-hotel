import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingsService } from './bookings.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Все бронирования' })
  @Get()
  findAll(@Req() req: any) {
    return this.bookingsService.findAll(req.user.id, req.user.role);
  }

  @ApiOperation({ summary: 'Одно бронирование' })
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.bookingsService.findOne(id, req.user.id, req.user.role);
  }

  @ApiOperation({ summary: 'Создать бронирование' })
  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.bookingsService.create(req.user.id, body);
  }

  @ApiOperation({ summary: 'Обновить статус бронирования' })
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: any,
  ) {
    return this.bookingsService.updateStatus(
      id,
      status,
      req.user.id,
      req.user.role,
    );
  }

  @ApiOperation({ summary: 'Удалить бронирование' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.bookingsService.remove(id, req.user.id, req.user.role);
  }
}
