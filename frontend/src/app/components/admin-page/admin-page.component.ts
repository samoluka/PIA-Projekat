import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllPendingCompanies().subscribe((companies: User[]) => {
      this.companies = companies;
    });
  }

  companies: User[] = [];

  approveCompany(user: User) {
    this.userService.approveCompany(user).subscribe((resp) => {
      this.ngOnInit();
    });
  }
  rejectCompany(user: User) {
    this.userService.rejectCompany(user).subscribe((resp) => {
      this.ngOnInit();
    });
  }
}
