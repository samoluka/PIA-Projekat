import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonService.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-company-info-page',
  templateUrl: './company-info-page.component.html',
  styleUrls: ['./company-info-page.component.css'],
})
export class CompanyInfoPageComponent implements OnInit {
  constructor(
    private servis: UserService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.oldUser = JSON.parse(localStorage.getItem('user'));
    this.update = Array.from({ length: 11 }, (i) => (i = false));
    this.changed = Array.from({ length: 11 }, (i) => (i = false));

    this.newLastName = this.user.lastName;
    this.newFirstName = this.user.firstName;
    this.newUsername = this.user.username;
    this.newPhone = this.user.phone;
    this.newPib = this.user.pib;
    this.newEmail = this.user.email;
    this.newName = this.user.name;
    this.newMatBroj = this.user.matBroj;
    this.newCategory = this.user.additionInfo.category;
    this.newPdv = this.user.additionInfo.pdv;
    this.newCode = this.user.additionInfo.code;
  }

  user: User;
  oldUser: User;
  newFirstName: string;
  newLastName: string;
  newUsername: string;
  newPhone: string;
  newPib: string;
  newEmail: string;
  newName: string;
  newMatBroj: string;
  newCategory: string;
  newPdv: boolean;
  newCode: string;

  newId: number;
  newWName: string;

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
    this.user.email = this.newEmail;
    this.user.name = this.newName;
    this.user.matBroj = this.newMatBroj;
    this.user.additionInfo.category = this.newCategory;
    this.user.additionInfo.pdv = this.newPdv;
    this.user.additionInfo.code = this.newCode;

    this.changed[id > 8 ? 8 : id] = true;
    this.update[id] = false;
  }

  saveChanges() {
    let updateData = {
      ...(this.changed[0] && { firstName: this.user.firstName }),
      ...(this.changed[1] && { lastName: this.user.lastName }),
      ...(this.changed[2] && { username: this.user.username }),
      ...(this.changed[3] && { phone: this.user.phone }),
      ...(this.changed[4] && { pib: this.user.pib }),
      ...(this.changed[5] && { email: this.user.email }),
      ...(this.changed[6] && { name: this.user.name }),
      ...(this.changed[7] && { matBroj: this.user.matBroj }),
      ...(this.changed[8] && {
        additionInfo: {
          category: this.user.additionInfo.category,
          pdv: this.user.additionInfo.pdv,
          code: this.user.additionInfo.code,
          warehouses: this.user.additionInfo.warehouses,
        },
      }),
    };
    console.log(updateData);
    this.servis.updateUser(this.oldUser, updateData).subscribe({
      next: (v: any) => {
        this.message = v['message'];
        localStorage.setItem('user', JSON.stringify(v['user']));
        this.commonService.sendUpdate(
          'Message from Sender Component to Receiver Component!'
        );
        this.ngOnInit();
      },
      error: (e) => {
        this.message = e.error['message'];
      },
    });
  }

  changePdv() {
    this.update[8] = true;
    this.newPdv = !this.newPdv;
    this.saveUpdate(8);
  }

  addWarehouse() {
    this.saveUpdate(8);
    this.user.additionInfo.warehouses.push({
      id: this.newId,
      name: this.newWName,
    });
  }
}
