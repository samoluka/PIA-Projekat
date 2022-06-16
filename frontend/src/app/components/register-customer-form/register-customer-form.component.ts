import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register-customer-form',
  templateUrl: './register-customer-form.component.html',
  styleUrls: ['./register-customer-form.component.css'],
})
export class RegisterCustomerFormComponent implements OnInit {
  constructor(private servis: UserService) {}

  ngOnInit(): void {}

  // Сваки купац има своје основне податке: корисничко име, лозинку, име,
  // Универзитет у Београду Електротехнички факултет
  // Катедра за рачунарску технику и информатику
  // презиме, контакт телефон и број личне карте

  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  phone: string;
  idNumber: string;
  message: string;

  register() {
    let user = new User();
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.username = this.username;
    user.password = this.password;
    user.phone = this.phone;
    user.pib = this.idNumber;

    let logedUser: User = JSON.parse(localStorage.getItem('user'));

    this.servis.registerCustomer(user).subscribe({
      next: (v: any) => {
        this.message = v['message'];
      },
      error: (e) => {
        this.message = e.error['message'];
      },
    });
  }
}
