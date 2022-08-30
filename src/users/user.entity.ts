import { Report } from '../reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: true,
  })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('insert', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('update', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('delete', this.id);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
