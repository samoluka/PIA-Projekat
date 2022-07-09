import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Category } from '../../../models/category';

interface CategoryNode {
  data: Category;
  children?: CategoryNode[];
}

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  categories: Category[];
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService
      .getCategories(this.user)
      .subscribe((categories: Category[]) => {
        console.log(categories);
        this.categories = categories;
        let data: CategoryNode[] = [];
        this.categories.forEach((category) => {
          let node: CategoryNode = {
            data: category,
            children: [],
          };
          category.subcategories.forEach((sub) => {
            node.children.push({
              data: sub,
            });
          });
          data.push(node);
        });
        this.dataSource.data = data;
        console.log(data);
      });
  }

  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();
  name: Map<string, string> = new Map();
  categoryToAdd: Category = null;

  hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  addProduct(category: Category) {
    this.categoryToAdd = category;
  }
  addSubcategory(category: Category) {
    this.userService
      .addSubCategory(this.user, category, this.name[category._id])
      .subscribe({
        next: (v) => {
          console.log(v);
          this.ngOnInit();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  addCategory() {
    this.userService.addCategory(this.user, this.name['new']).subscribe({
      next: (v) => {
        console.log(v);
        this.ngOnInit();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
