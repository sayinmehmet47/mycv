import { User } from '../users/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  milage: number;

  @Column({
    default: false,
  })
  isApproved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
