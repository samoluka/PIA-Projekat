import { Component, OnInit } from '@angular/core';
import { Table } from '../../../models/table';
import { User } from '../../../models/user';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css'],
})
export class TablesPageComponent implements OnInit {
  constructor() {}

  width: Number = 200;
  height: Number = 200;

  user: User;
  tables: Table[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.tables = this.user.rooms[0].tables;
    console.log(`stolovi`);
    console.log(this.tables);
  }
}
