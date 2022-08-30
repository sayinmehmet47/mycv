import { GetEstimateDto } from './dtos/get-estimate.dto';
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

  createEstimate({ make, model, lng, lat, year, milage }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make=:make', { make: make })
        .andWhere('model=:model', { model: model })

        //lng withing the +/- 5 degrees
        .andWhere('lng -:lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat -:lat BETWEEN -5 AND 5', { lat })
        .andWhere('year -:year BETWEEN -3 AND 3', { year })
        .andWhere('isApproved IS TRUE')
        .orderBy('ABS(milage-:milage)', 'DESC')
        .setParameters({ milage })
        .limit(3)
        .getRawOne()
    );
  }
}
