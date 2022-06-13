import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private servis: UserService) {}

  ngOnInit(): void {}

  username: string;
  password: string;

  register() {
    this.servis.registerUser(this.username, this.password).subscribe((resp) => {
      alert(resp['message']);
    });
  }
}
