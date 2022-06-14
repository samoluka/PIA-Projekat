import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private servis: UserService) {}

  ngOnInit(): void {}

  // Регистрација предузећа треба да захтева унос следећих података:
  // - име и презиме одговорног лица,
  // - корисничко име (које је јединствено, на нивоу свих корисника у систему),
  // - лозинка1
  //  (и потврда лозинке),
  // - контакт телефон,
  // - и-мејл адреса (јединствено, највише један кориснички налог по и-мејл адреси),
  // - назив предузећа,
  // - адреса седишта предузећа (држава, град, поштански број, улица и број),
  // - порески идентификациони број (ПИБ2
  // ),
  // - матични број предузећа.

  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  name: string;
  pib: string;
  matBroj: string;

  register() {
    let user = new User();
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.username = this.username;
    user.password = Md5.hashStr(this.password);
    user.phone = this.phone;
    user.email = this.email;
    user.name = this.name;
    user.pib = this.pib;
    user.matBroj = this.matBroj;

    this.servis.registerUser(user).subscribe((resp) => {
      alert(resp['message']);
    });
  }
}

