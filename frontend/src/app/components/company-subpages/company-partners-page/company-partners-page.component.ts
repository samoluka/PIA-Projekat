import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-company-partners-page',
  templateUrl: './company-partners-page.component.html',
  styleUrls: ['./company-partners-page.component.css'],
})
export class CompanyPartnersPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  user: User;
  pib: string;
  companies: User[] = [];
  message: string;

  search() {
    this.userService.findUserByPIB(this.pib).subscribe((companies: User[]) => {
      if (companies) {
        console.log(companies);

        this.companies = companies;
      } else {
        this.companies = [];
      }
    });
  }
  addPartner(company: User) {
    this.userService.addPartner(this.user, company.username).subscribe({
      next: (v: any) => {
        this.message = v['message'];
      },
      error: (err) => {
        this.message = err.error['message'];
      },
    });
  }
}
