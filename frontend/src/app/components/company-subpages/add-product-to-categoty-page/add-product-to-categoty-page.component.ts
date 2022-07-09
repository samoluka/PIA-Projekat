import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-product-to-categoty-page',
  templateUrl: './add-product-to-categoty-page.component.html',
  styleUrls: ['./add-product-to-categoty-page.component.css'],
})
export class AddProductToCategotyPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: User;
  products: Product[];
  toDisplay: Product[];

  @Input() category!: Category;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService
      .findCompanyWithProducts(this.user, -1, -1)
      .subscribe((user: User) => {
        this.products = user.products;
        this.toDisplay = user.products;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length == 0) {
      this.toDisplay = this.products;
    } else {
      this.toDisplay = this.products.filter((p) =>
        p.name.includes(filterValue)
      );
    }
  }
  addToCategory(product: Product) {
    this.userService
      .addProductToCategory(product, this.category)
      .subscribe((e) => {
        this.ngOnInit();
      });
  }
}
