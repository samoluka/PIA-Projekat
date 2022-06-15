import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.css'],
})
export class PasswordChangerComponent implements OnInit {
  constructor(private servis: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  password: String;
  oldPassword: String;
  passwordConfirm: String;
  user: User;
  message: String;

  changePassword() {
    if (this.user == null) {
      return;
    }
    this.servis
      .changePassword(this.user, this.oldPassword, this.password)
      .subscribe({
        next: (v: any) => {
          localStorage.setItem('message', 'uspesna promena lozinke');
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.message = e.error['message'];
        },
      });
  }
}
