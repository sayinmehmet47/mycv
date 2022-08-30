import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  milage: number;
  @Expose()
  isApproved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
