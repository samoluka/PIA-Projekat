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
        if (message != 'logout') this.ngOnInit();
      });
  }

  sumN = 0;
  sumY = 0;

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
    this.userService
      .findUserWithPartners(JSON.parse(localStorage.getItem('user')))
      .subscribe((user: User) => {
        console.log(user);
        if (user)
          if (user.partners.length > 0)
            this.partnerName = user.partners[0].username;
      });

    this.userService.getMyReceipts('123').subscribe((rec) => {
      let date = new Date();
      let onThisDate = rec.filter((r) => {
        let y = Number.parseInt(r.date.toString().substring(0, 4));
        let m = Number.parseInt(r.date.toString().substring(5, 7));
        let d = Number.parseInt(r.date.toString().substring(8, 10));
        return (
          y === date.getFullYear() &&
          m === date.getMonth() + 1 &&
          d === date.getDate()
        );
      });
      console.log(onThisDate);
      this.sumY = 0;
      this.sumN = 0;
      onThisDate.forEach((r) => {
        r.productsInfo.forEach((p) => {
          this.sumN += p.price * p.quantity;
          this.sumY += p.price * p.quantity * (1 + p.taxRate / 100.0);
        });
      });
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

  partnerName: string;

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
