import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  registerUser(username: string, password: string) {
    const data = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.uri}/users/addUser`, data);
  }
}
