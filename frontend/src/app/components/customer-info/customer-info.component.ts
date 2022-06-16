import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
})
export class CustomerInfoComponent implements OnInit {
  constructor(private servis: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.oldUser = JSON.parse(localStorage.getItem('user'));
    this.update = Array.from({ length: 5 }, (i) => (i = false));
    this.changed = Array.from({ length: 5 }, (i) => (i = false));

    this.newLastName = this.user.lastName;
    this.newFirstName = this.user.firstName;
    this.newUsername = this.user.username;
    this.newPhone = this.user.phone;
    this.newPib = this.user.pib;
  }

  user: User;
  oldUser: User;
  newFirstName: string;
  newLastName: string;
  newUsername: string;
  newPhone: string;
  newPib: string;

  message: string;
  update: boolean[];
  changed: boolean[];

  startUpdate(id: number) {
    this.update[id] = true;
  }
  saveUpdate(id: number) {
    this.user.firstName = this.newFirstName;
    this.user.lastName = this.newLastName;
    this.user.username = this.newUsername;
    this.user.phone = this.newPhone;
    this.user.pib = this.newPib;
    this.changed[id] = true;
    this.update[id] = false;
  }

  saveChanges() {
    let updateData = {
      ...(this.changed[0] && { firstName: this.user.firstName }),
      ...(this.changed[1] && { lastName: this.user.lastName }),
      ...(this.changed[2] && { username: this.user.username }),
      ...(this.changed[3] && { phone: this.user.phone }),
      ...(this.changed[4] && { pib: this.user.pib }),
    };
    console.log(updateData);
    this.servis.updateUser(this.oldUser, updateData).subscribe({
      next: (v: any) => {
        this.message = v['message'];
        localStorage.setItem('user', JSON.stringify(v['user']));
        this.ngOnInit();
      },
      error: (e) => {
        this.message = e.error['message'];
      },
    });
  }
}
