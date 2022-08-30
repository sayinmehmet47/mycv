import { Report } from './report.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from 'src/reports/dtos/report-approved.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(body: CreateReportDto, user) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproved(body: ApproveReportDto, id: number) {
    const report = await this.repo.findOneBy({ id });

    if (!report) {
      throw new NotFoundException(`Not Found ${id}`);
    }

    report.isApproved = body.isApproved;
    return await this.repo.save(report);
  }
}
