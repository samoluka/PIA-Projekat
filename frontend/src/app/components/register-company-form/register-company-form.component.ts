import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from '../../services/commonService.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { arrayBufferToBlob } from 'blob-util';

@Component({
  selector: 'app-register-company-form',
  templateUrl: './register-company-form.component.html',
  styleUrls: ['./register-company-form.component.css'],
})
export class RegisterCompanyFormComponent implements OnInit {
  constructor(
    private servis: UserService,
    private commonService: CommonService,
    private router: Router
  ) {}

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
  passwordConfirm: String;
  phone: string;
  email: string;
  name: string;
  pib: string;
  matBroj: string;
  file: File;
  blob: Blob;
  message: string;

  register() {
    let user = new User();
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.username = this.username;
    user.password = this.password;
    user.phone = this.phone;
    user.email = this.email;
    user.name = this.name;
    user.pib = this.pib;
    user.matBroj = this.matBroj;

    let logedUser: User = JSON.parse(localStorage.getItem('user'));

    this.servis.registerCompany(user).subscribe({
      next: (v: any) => {
        this.message = v['message'];
        if (logedUser != null && logedUser.username === 'admin') {
          this.commonService.sendUpdate(
            'Message from Sender Component to Receiver Component!'
          );
        }
      },
      error: (e) => {
        this.message = e.error['message'];
      },
    });
  }
  uploadPhoto() {
    console.log(this.file.name);

    this.servis.addPhoto(this.file).subscribe({
      next: (v: any) => {
        this.message = v['message'];
      },
      error: (e) => {
        console.log(e);
        console.log(e['message']);

        this.message = e.error['message'];
      },
    });
  }
  change(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
}
