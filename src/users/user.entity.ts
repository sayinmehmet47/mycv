import { Report } from 'src/reports/report.entity';
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
