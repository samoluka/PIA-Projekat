import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  addProduct(product: Product, photo: File) {
    const formData = new FormData();
    formData.append('code', product.code);
    formData.append('name', product.name);
    formData.append('taxRate', product.taxRate.toString());
    formData.append('companyUsername', product.company.username);
    formData.append('unit', product.unit);
    formData.append('warehouseInfo', JSON.stringify(product.warehouseInfo));
    formData.append('additionalData', JSON.stringify(product.additionalData));
    if (product.productType) {
      formData.append('productType', product.productType);
    }
    if (photo) formData.append('file', photo, photo.name);
    return this.http.post(`${this.uri}/products/addProduct`, formData);
  }
  deleteProduct(product: Product) {
    const data = {
      id: product._id,
    };
    return this.http.delete(`${this.uri}/products/delete`, {
      body: data,
    });
  }

  getNumberOfProducts(user: User) {
    return this.http.get(
      `${this.uri}/products/numberOfProducts?id=${user._id}`
    );
  }
}
