import { Test, TestingModule } from '@nestjs/testing';
import generateFakeUser from '../helpers/generate-fake-user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { agent } from 'supertest';
import { UserModule } from '../user.module';
import userAttributes from '../helpers/user-attributes';
import * as R from 'ramda';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'example',
          database: 'e2e_test',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = app.get('UserRepository');
  });

  afterEach(async () => {
    await repository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return users', async () => {
      const fakeUsers = [generateFakeUser(), generateFakeUser()];
      await repository.save(fakeUsers);
      const { body } = await agent(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200);
      expect(body).toBeTruthy();
      (body as User[]).forEach((user: User, index: number) => {
        const fakeUser = fakeUsers[index];
        expect(user).toMatchObject(fakeUser);
        userAttributes.forEach((key) => expect(user).toHaveProperty(key));
      });
    });
  });

  describe('GET /users?email=<value>', () => {
    it('should return specific user by email', async () => {
      const fakeUsers = [generateFakeUser(), generateFakeUser()];
      const firstFakeUser = fakeUsers[0];
      await repository.save(fakeUsers);
      const { body: user } = await agent(app.getHttpServer())
        .get(`/users?email=${firstFakeUser.email}`)
        .set('Accept', 'application/json')
        .expect(200);
      expect(user).toBeTruthy();
      expect(user).toMatchObject(firstFakeUser);
      userAttributes.forEach((key) => expect(user).toHaveProperty(key));
    });
  });

  describe('POST /users', () => {
    it('should add a new user', async () => {
      const newFakeUser = generateFakeUser();
      const { body: user } = await agent(app.getHttpServer())
        .post('/users')
        .send(newFakeUser)
        .set('Accept', 'application/json')
        .expect(201);
      expect(user).toBeTruthy();
      expect(user).toMatchObject(newFakeUser);
      userAttributes.forEach((key) => expect(user).toHaveProperty(key));
    });
  });

  describe('PATCH /users', () => {
    it('should update the user details', async () => {
      const newFakeUser = generateFakeUser();
      await repository.save(newFakeUser);
      const updatedProperty = {
        ...R.omit(['id'])(generateFakeUser()),
      };
      const { body: user } = await agent(app.getHttpServer())
        .patch(`/users/${newFakeUser.id}`)
        .send(updatedProperty)
        .set('Accept', 'application/json')
        .expect(200);
      expect(user).toBeTruthy();
      expect(user).toMatchObject({
        id: newFakeUser.id,
        ...updatedProperty,
      });
      userAttributes.forEach((key) => expect(user).toHaveProperty(key));
    });
  });

  describe('DELETE /users', () => {
    it('should delete the user', async () => {
      const newFakeUser = generateFakeUser();
      await repository.save(newFakeUser);
      await agent(app.getHttpServer())
        .delete(`/users/${newFakeUser.id}`)
        .set('Accept', 'application/json')
        .expect(204);
      expect(await repository.count({ id: newFakeUser.id })).toEqual(0);
    });
  });
});
