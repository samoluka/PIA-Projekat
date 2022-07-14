import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { min } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-company-products',
  templateUrl: './all-company-products.component.html',
  styleUrls: ['./all-company-products.component.css'],
})
export class AllCompanyProductsComponent implements OnInit {
  constructor(private userService: UserService) {}

  allCompanies: User[];
  selectedCompany: User;
  productName: string = '';
  producerName: string = '';
  availibility: Map<string, string[]> = new Map();
  minPrice: Map<string, string> = new Map();
  productsToDisplay: Product[];

  ngOnInit(): void {
    this.userService
      .getAllApprovedCompanies()
      .subscribe((c: User[]) => (this.allCompanies = c));
  }

  search() {
    if (this.selectedCompany != null)
      this.userService
        .findCompanyWithProducts(this.selectedCompany, -1, -1)
        .subscribe((u: User) => {
          this.productsToDisplay = u.products;
          this.productsToDisplay = this.filter(this.productsToDisplay);
          this.availibility = new Map();
          console.log(u);
          this.productsToDisplay.forEach((p) => {
            let arr = [];
            let m = '';
            let min = Number.MAX_SAFE_INTEGER;
            p.objectInfo.forEach((o) => {
              if (o.stocks > 0) {
                arr.push(o.location);
                if (o.sellPrice < min) {
                  min = o.sellPrice;
                  m = `minimalna cena: ${o.sellPrice}, dostupno u: ${o.location}`;
                }
              }
            });
            this.minPrice.set(p._id, m);
            this.availibility.set(p._id, arr);
          });
        });
  }
  filter(all: Product[]) {
    let ret = all;
    if (this.productName.length > 0) {
      ret = ret.filter((p) => p.name.includes(this.productName));
    }
    if (this.producerName.length > 0) {
      ret = ret.filter((p) => {
        if (p.additionalData.producer)
          return p.additionalData.producer.includes(this.producerName);
        return false;
      });
    }
    console.log(ret);
    return ret;
  }
}
