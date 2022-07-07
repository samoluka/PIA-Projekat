import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private commonService: CommonService
  ) {}

  user: User;
  current = 0;

  messageReceived: any;
  private subscriptionName: Subscription;

  // @ViewChild(MatPaginator)
  // matPaginator: MatPaginator;

  getData(e) {
    if (e) this.current++;
    else this.current--;
    this.userService
      .findCompanyWithProducts(
        JSON.parse(localStorage.getItem('user')),
        this.current * 10,
        10
      )
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnInit(): void {
    this.userService
      .findCompanyWithProducts(JSON.parse(localStorage.getItem('user')), 0, 10)
      .subscribe((user: User) => {
        if (user) this.user = user;
      });
    this.commonService.getUpdate().subscribe((message) => {
      this.ngOnInit();
    });
  }
  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }
}
