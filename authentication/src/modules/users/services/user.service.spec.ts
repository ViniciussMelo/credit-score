import { describe, test, beforeEach, expect, jest } from '@jest/globals';
import { mock } from 'ts-mockito';

import { BcryptHash } from '../../../../src/shared/utils/bcrypt-hash.utils';
import { UserFacade } from '../../../../test/mocks/user/user-facade.mock';
import { AppError } from '../../../../src/shared/errors/app.error';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe('Test suit for UserService', () => {
  let userFacade: UserFacade;
  let service: UserService;

  beforeEach(() => {
    const userRepositoryMock = mock(UserRepository);
    userFacade = new UserFacade();
    service = new UserService(userRepositoryMock);
  });

  describe('#create', () => {
    test('should be able to create a new customer user', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findByEmail')
        .mockReturnValueOnce(null);

      const password = await BcryptHash.hashPassword(customer.password);

      jest.spyOn(BcryptHash, 'hashPassword')
        .mockResolvedValueOnce(password);

      const entity = {
        email: customer.email,
        name: customer.name,
        password,
        role: customer.role
      }

      const spy = jest.spyOn((service as any).userRepository, 'create')
        .mockReturnValueOnce(entity);

      await service.create(customer);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        email: customer.email,
        name: customer.name,
        password,
        role: customer.role
      });
    });

    test('should not be able to create a customer with same email', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findByEmail')
        .mockReturnValueOnce(customer);

      await expect(
        service.create(customer)
      ).rejects.toEqual(
        new AppError('User already exists', 409)
      );
    });
  });

  describe('#login', () => {
    test('should be able to login', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findByEmail')
        .mockReturnValueOnce(customer);

      jest.spyOn(BcryptHash, 'verifyPassword')
        .mockResolvedValueOnce(true);

      const spy = jest.spyOn((service as any).authenticationService, 'signIn')
        .mockResolvedValueOnce({
          accessToke: 'accessToke',
          refreshToken: 'refreshToken'
        });

      await service.login(customer);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ ...customer, isAdmin: false });
    });

    test('should not be able with the user does not exists', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findByEmail')
        .mockReturnValueOnce(null);

      await expect(
        service.login(customer)
      ).rejects.toEqual(
        new AppError('Unauthorized', 401)
      );
    });

    test('should not be able with invalid password', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findByEmail')
        .mockReturnValueOnce(customer);

      jest.spyOn(BcryptHash, 'verifyPassword')
        .mockResolvedValueOnce(false);

      await expect(
        service.login(customer)
      ).rejects.toEqual(
        new AppError('Unauthorized', 401)
      );
    });
  });

  describe('#delete', () => {
    test('should be able to delete a user', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findById')
        .mockReturnValueOnce(customer);

      const spy = jest.spyOn((service as any).userRepository, 'deleteById')
        .mockReturnValueOnce(null);

      await service.delete(customer.id)

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(customer.id);
    });

    test('should not be able to delete a invalid user', async () => {
      const [customer] = userFacade.buildCustomerProfile();

      jest.spyOn((service as any).userRepository, 'findById')
        .mockReturnValueOnce(null);

      await expect(
        service.delete(customer.id)
      ).rejects.toEqual(
        new AppError('Unauthorized', 401)
      );
    });
  });
});