import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/commonService.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.subscriptionName = this.commonService
      .getUpdate()
      .subscribe((message) => {
        console.log(message);
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.userService.getAllPendingCompanies().subscribe((companies: User[]) => {
      this.companies = companies;
    });
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  messageReceived: any;
  private subscriptionName: Subscription;
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
