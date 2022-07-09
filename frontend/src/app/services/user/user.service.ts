import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { NgIf } from '@angular/common';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password,
    };

    return this.http.post(`${this.uri}/users/login`, data);
  }

  getAllPendingCompanies() {
    const filter = {
      type: 'company',
      status: 'pending',
    };
    return this.http.get(
      `${this.uri}/users/getAllUsersWithFilter/?filter=${JSON.stringify(
        filter
      )}`
    );
  }

  findUserByPIB(pib: string) {
    const filter = {
      pib: pib,
    };
    return this.http.get(
      `${this.uri}/users/getAllUsersWithFilter/?filter=${JSON.stringify(
        filter
      )}`
    );
  }

  getAllApprovedCompanies() {
    const filter = {
      type: 'company',
      status: { $nin: ['rejected', 'pending'] },
    };
    return this.http.get(
      `${this.uri}/users/getAllUsersWithFilter/?filter=${JSON.stringify(
        filter
      )}`
    );
  }

  registerCompany(user: User) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      phone: user.phone,
      email: user.email,
      name: user.name,
      pib: user.pib,
      matBroj: user.matBroj,
      type: 'company',
    };
    return this.http.post(`${this.uri}/users/addUser`, data);
  }

  registerCustomer(user: User) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      phone: user.phone,
      pib: user.pib,
      type: 'customer',
    };
    return this.http.post(`${this.uri}/users/addUser`, data);
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  addPhoto(file: File) {
    console.log(file);

    console.log(file instanceof Blob);
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.uri}/users/upload`, formData);
  }

  changePassword(user: User, oldPassword: String, newPassword: String) {
    const data = {
      username: user.username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  setUserStatus(user: User, status: string) {
    const data = {
      username: user.username,
      status: status,
    };
    return this.http.post(`${this.uri}/users/setUserStatus`, data);
  }

  updateUser(user: User, update: any) {
    const data = {
      username: user.username,
      update: update,
    };
    return this.http.post(`${this.uri}/users/updateUser`, data);
  }

  addPartner(user: User, partnerUsername: string) {
    const data = {
      username: user.username,
      partner: partnerUsername,
    };
    return this.http.post(`${this.uri}/users/addPartnerToCompany`, data);
  }

  setCompanyAdditionInfo(
    user: User,
    info: { category: string; code: string; pdv: boolean }
  ) {
    const data = {
      username: user.username,
      additionInfo: info,
    };
    return this.http.post(`${this.uri}/users/setCompanyAdditionInfo`, data);
  }

  findUserWithPartners(user: User) {
    const data = {
      username: user.username,
    };
    console.log(`trazim za korisnika ${user.username}`);

    return this.http.post(`${this.uri}/users/findUserWithPartners`, data);
  }

  findCompanyWithProducts(user: User, start: number, end: number) {
    return this.http.get(
      `${this.uri}/users/findUserWithProducts/?username=${user.username}&start=${start}&end=${end}`
    );
  }

  getCategories(user: User) {
    return this.http.get<Category[]>(
      `${this.uri}/products/getCategories?id=${user._id}`
    );
  }

  addCategory(user: User, name: string) {
    return this.http.post(`${this.uri}/products/addCategoty`, {
      name: name,
      company: user._id,
    });
  }
  addSubCategory(user: User, category: Category, name: string) {
    return this.http.post(`${this.uri}/products/addSubcategory`, {
      name: name,
      company: user._id,
      category: category._id,
    });
  }

  addProductToCategory(product: Product, category: Category) {
    return this.http.post(`${this.uri}/products/addToCategory`, {
      product: product._id,
      category: category._id,
    });
  }
}

// "name": "konobar",
// "category":"62c7621097ed3c5b797e51ad",
// "company": "62c760c0a574087adaafaeba"