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
      this.companiesPending = companies;
    });
    this.userService
      .getAllApprovedCompanies()
      .subscribe((companies: User[]) => {
        this.companiesApproved = companies;
      });
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  messageReceived: any;
  private subscriptionName: Subscription;
  companiesPending: User[] = [];
  companiesApproved: User[] = [];

  approveCompany(user: User) {
    this.userService.setUserStatus(user, 'active').subscribe((resp) => {
      this.ngOnInit();
    });
  }
  rejectCompany(user: User) {
    this.userService.setUserStatus(user, 'rejected').subscribe((resp) => {
      this.ngOnInit();
    });
  }

  changeStatus(user: User) {
    this.userService
      .setUserStatus(user, user.status === 'active' ? 'suspended' : 'active')
      .subscribe((resp) => {
        this.ngOnInit();
      });
  }
}
