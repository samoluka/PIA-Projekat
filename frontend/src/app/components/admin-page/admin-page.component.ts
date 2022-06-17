import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/commonService.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { filter, Subscription } from 'rxjs';

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
      this.companiesPendingFiltered = companies;
    });
    this.userService
      .getAllApprovedCompanies()
      .subscribe((companies: User[]) => {
        this.companiesApproved = companies;
        this.companiesApprovedFiltered = companies;
      });
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  messageReceived: any;
  private subscriptionName: Subscription;
  companiesPending: User[] = [];
  companiesApproved: User[] = [];

  companiesPendingFiltered: User[] = [];
  companiesApprovedFiltered: User[] = [];

  pendingFilter: string = '';
  approvedFilter: string = '';

  updateFilters(isPending: boolean) {
    if (isPending) {
      if (this.pendingFilter.length > 0) {
        this.companiesPendingFiltered = this.companiesPending.filter((user) => {
          return user.username.includes(this.pendingFilter);
        });
      } else {
        this.companiesPendingFiltered = this.companiesPending;
      }
    } else {
      if (this.approvedFilter.length > 0) {
        console.log(this.approvedFilter);
        this.companiesApprovedFiltered = this.companiesApproved.filter(
          (user) => {
            return user.username.includes(this.approvedFilter);
          }
        );
      } else {
        this.companiesApprovedFiltered = this.companiesApproved;
      }
    }
  }

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
