import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  registerUser(user: User) {
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
}
