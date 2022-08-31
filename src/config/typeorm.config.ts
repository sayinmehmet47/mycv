import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = {
      synchronize: false,
    };
    switch (process.env.NODE_ENV) {
      case 'development':
        Object.assign(dbConfig, {
          type: 'sqlite',
          database: 'db.sqlite',
          entities: ['**/*.entity.js'],
        });
        break;

      case 'test':
        Object.assign(dbConfig, {
          type: 'sqlite',
          database: 'test.sqlite',
          entities: ['**/*.entity.js'],
        });
        break;
      case 'production':
        break;

      default:
        throw new Error('Unknown environment');
    }

    return dbConfig;
  }
}
