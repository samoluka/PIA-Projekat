import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private commonService: CommonService) {
    this.subscriptionName = this.commonService
      .getUpdate()
      .subscribe((message) => {
        this.ngOnInit();
      });
  }

  user: User;

  messageReceived: any;
  private subscriptionName: Subscription;

  ngOnInit(): void {
    let userString = localStorage.getItem('user');
    if (userString) this.user = JSON.parse(userString);
    else this.user = null;
  }
  logOut() {
    localStorage.removeItem('user');
    this.commonService.sendUpdate('logout');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }
}
