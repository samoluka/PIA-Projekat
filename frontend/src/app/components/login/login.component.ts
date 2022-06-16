import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if ('message' in localStorage) {
      this.message = localStorage.getItem('message');
      localStorage.removeItem('message');
    }
  }

  username: string;
  password: string;

  message: string;

  login() {
    this.userService
      .login(this.username, this.password)
      .subscribe((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // if (user.type === 'admin') this.router.navigate(['/admin']);
          // else this.router.navigate(['/user']);
          switch (user.type) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'company':
              this.router.navigate(['company']);
              break;
          }
        } else this.message = 'Bad data';
      });
  }
}
