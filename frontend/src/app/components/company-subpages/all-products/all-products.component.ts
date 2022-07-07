import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: User;
  current = 0;
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
        if (user) this.user = user;
      });
  }

  ngOnInit(): void {
    this.userService
      .findCompanyWithProducts(JSON.parse(localStorage.getItem('user')), 0, 10)
      .subscribe((user: User) => {
        if (user) this.user = user;
      });
  }
}
