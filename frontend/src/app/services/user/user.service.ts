import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password,
    };

    return this.http.post(`${this.uri}/users/login`, data);
  }

  getAllPendingCompanies() {
    const filter = {
      type: 'company',
      status: 'pending',
    };
    return this.http.get(
      `${this.uri}/users/getAllUsersWithFilter/?filter=${JSON.stringify(
        filter
      )}`
    );
  }

  getAllApprovedCompanies() {
    const filter = {
      type: 'company',
      status: { $nin: ['rejected', 'pending'] },
    };
    return this.http.get(
      `${this.uri}/users/getAllUsersWithFilter/?filter=${JSON.stringify(
        filter
      )}`
    );
  }

  registerCompany(user: User) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      phone: user.phone,
      email: user.email,
      name: user.name,
      pib: user.pib,
      matBroj: user.matBroj,
      type: 'company',
    };
    return this.http.post(`${this.uri}/users/addUser`, data);
  }

  registerCustomer(user: User) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      phone: user.phone,
      pib: user.pib,
      type: 'customer',
    };
    return this.http.post(`${this.uri}/users/addUser`, data);
  }

  changePassword(user: User, oldPassword: String, newPassword: String) {
    const data = {
      username: user.username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  setUserStatus(user: User, status: string) {
    const data = {
      username: user.username,
      status: status,
    };
    return this.http.post(`${this.uri}/users/setUserStatus`, data);
  }

  updateUser(user: User, update: any) {
    const data = {
      username: user.username,
      update: update,
    };
    return this.http.post(`${this.uri}/users/updateUser`, data);
  }

  setCompanyAdditionInfo(
    user: User,
    info: { category: string; code: string; pdv: boolean }
  ) {
    const data = {
      username: user.username,
      additionInfo: info,
    };
    return this.http.post(`${this.uri}/users/setCompanyAdditionInfo`, data);
  }

  findUserWithPartners(user: User) {
    const data = {
      username: user.username,
    };
    console.log(`trazim za korisnika ${user.username}`);

    return this.http.post(`${this.uri}/users/findUserWithPartners`, data);
  }
}
