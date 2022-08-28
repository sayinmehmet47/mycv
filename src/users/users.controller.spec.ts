import { NotFoundException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UserController', () => {
  let appController: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@gmail.com',
          password: '123',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'asdf',
          } as User,
        ]);
      },
      // remove: () => {},
      // create: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signIn: () => {},
      // signup: () => {},
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    appController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('findAllUsers returns a list of users with the given email', async () => {
      const user = await appController.findAllUsers('deneme@example.com');
      expect(user.length).toEqual(1);
      expect(user[0].email).toEqual('deneme@example.com');
    });

    it('getUser returns a  user with the given id', async () => {
      const user = await appController.getUser('1');
      expect(user).toBeDefined();
    });

    it('getUser throws an error if user with given id not found', async () => {
      fakeUserService.findOne = () => null;
      const id = '1';
      await expect(appController.getUser(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
