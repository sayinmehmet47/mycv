import { AuthGuard } from 'src/guards/auth.guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return await this.reportService.create(body, user);
  }
}
