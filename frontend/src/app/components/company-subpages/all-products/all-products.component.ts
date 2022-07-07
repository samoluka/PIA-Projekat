import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.userService
      .findCompanyWithProducts(JSON.parse(localStorage.getItem('user')))
      .subscribe((user: User) => {
        console.log('ovo treba da bude popunjen korisnik');
        console.log(user);
        if (user) this.user = user;
      });
  }
}
