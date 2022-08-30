import { ReportDto } from './dtos/report.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from 'src/reports/dtos/report-approved.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async create(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return await this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  changeApproved(@Body() body: ApproveReportDto, @Param('id') id: string) {
    return this.reportService.changeApproved(body, parseInt(id));
  }
}
