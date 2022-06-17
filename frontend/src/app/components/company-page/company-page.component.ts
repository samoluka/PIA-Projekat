import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css'],
})
export class CompanyPageComponent implements OnInit {
  constructor(private commonService: CommonService) {
    this.subscriptionName = this.commonService
      .getUpdate()
      .subscribe((message) => {
        this.ngOnInit();
      });
  }
  messageReceived: any;
  private subscriptionName: Subscription;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.additionInfo);
  }
  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  user: User;
}
