import { UserFluentAPI } from './user-fluent-api.mock';

export class UserFacade {
  private readonly userFluentAPI: UserFluentAPI;

  constructor() {
    this.userFluentAPI = new UserFluentAPI();
  }

  buildCustomerProfile() {
    return this.userFluentAPI
      .getCustomer()
      .buildUser();
  }

  buildAdminProfile() {
    return this.userFluentAPI
      .getAdmin()
      .buildUser();
  }
}