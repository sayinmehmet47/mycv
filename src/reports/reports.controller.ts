import { ReportDto } from './dtos/report.dto';
import { AuthGuard } from '../guards/auth.guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from '../reports/dtos/report-approved.dto';
import { AdminGuard } from '../guards/admin.guards';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.createEstimate(query);
  }
}
