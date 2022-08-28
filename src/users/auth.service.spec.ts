import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //create a fake auth service
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as User;

        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user: User = await service.signup('test4@test.com', 'password');
    expect(user.password).not.toBe('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      'User already exists',
    );
  });

  it('throws an error if signed with email that is not in use', async () => {
    await expect(service.signIn('asdf@asdf.com', 'asdf')).rejects.toThrow(
      'user not found',
    );
  });

  it('throws an error if signed with invalid password', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a@asdf.com', password: '1' } as User]);
    // await expect(service.signIn('asdf@asdf.com', 'fds')).rejects.toThrow(
    //   'Incorrect password',
    // );
    await service.signup('test4@test.com', 'password');
    await expect(service.signIn('test4@test.com', 'password2')).rejects.toThrow(
      'Incorrect password',
    );
  });

  it('returns a user if signIn with correct email and password', async () => {
    await service.signup('test4@test.com', 'password');
    const user = await service.signIn('test4@test.com', 'password');
    expect(user).toBeDefined();
  });
});
