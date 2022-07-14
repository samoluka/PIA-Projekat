import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-company-partners-page',
  templateUrl: './company-partners-page.component.html',
  styleUrls: ['./company-partners-page.component.css'],
})
export class CompanyPartnersPageComponent implements OnInit {
  constructor(
    private service: UserService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  user: User;
  pib: string;
  companies: User[] = [];
  message: string;

  hide: boolean = true;
  hidec: boolean = true;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirm: String;
  phone: string;
  email: string;
  name: string;
  pibN: string;
  matBroj: string;
  file: File;
  city: string;
  postNumber: string;
  street: string;
  streetNumber: string;

  register() {
    let user = new User();
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.username = this.username;
    user.password = '1';
    user.phone = this.phone;
    user.email = this.email;
    user.name = this.name;
    user.pib = this.pibN;
    user.matBroj = this.matBroj;
    user.address = {
      city: this.city,
      postNumber: this.postNumber,
      street: this.street,
      streetNumber: this.streetNumber,
    };

    let logedUser: User = JSON.parse(localStorage.getItem('user'));

    this.service.registerCompany(user, null).subscribe({
      next: (v: any) => {
        this.service.addPartner(this.user, this.username).subscribe({
          next: (v: any) => {
            console.log(v);
            this.message = v['message'];
          },
          error: (err) => {
            console.log(err);
            this.message = err.error['message'];
          },
        });
      },
      error: (e) => {
        console.log(e);
        this.message = e.error['message'];
      },
    });
  }

  search() {
    this.service.findUserByPIB(this.pib).subscribe((companies: User[]) => {
      if (companies) {
        console.log(companies);

        this.companies = companies;
      } else {
        this.companies = [];
      }
    });
  }
  addPartner(company: User) {
    this.service.addPartner(this.user, company.username).subscribe({
      next: (v: any) => {
        this.message = v['message'];
      },
      error: (err) => {
        this.message = err.error['message'];
      },
    });
  }
}
