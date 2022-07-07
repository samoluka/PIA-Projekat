import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  addProduct(product: Product, photo: File) {
    // const data = {
    //   code: product.code,
    //   name: product.name,
    //   taxRate: product.taxRate,
    //   companyUsername: product.company.username,
    //   unit: product.unit,
    // };
    const formData = new FormData();
    formData.append('code', product.code);
    formData.append('name', product.name);
    formData.append('taxRate', product.taxRate.toString());
    formData.append('companyUsername', product.company.username);
    formData.append('unit', product.unit);
    if (photo) formData.append('file', photo, photo.name);
    return this.http.post(`${this.uri}/products/addProduct`, formData);
  }
}
