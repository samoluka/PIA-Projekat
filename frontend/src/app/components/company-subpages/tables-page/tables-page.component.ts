import { Component, OnInit } from '@angular/core';
import { Table } from '../../../models/table';
import { User } from '../../../models/user';

interface Room {
  name: string;
  tables: [Table];
}

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css'],
})
export class TablesPageComponent implements OnInit {
  constructor() {}

  newWidth: number;
  newHeight: number;
  type: string;

  user: User;
  rooms: Room[];

  newTables: Table[];

  tableStyleMap: Map<string, string> = new Map();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rooms = this.user.rooms;
    this.rooms.forEach((r) => {
      r.tables.forEach((t) => {
        this.tableStyleMap[
          `${t.centerX};${t.centerY}`
        ] = `translate3d(${t.centerX}px,${t.centerY}px,0px)`;
      });
    });
    this.newTables = [];
  }

  addTable(roomName: string) {
    let t = new Table();
    t.width = this.newWidth;
    if (this.type == 'circle') {
      t.height = this.newWidth;
    } else {
      t.height = this.newWidth;
    }
    t.shape = this.type;
    t.centerX = 100;
    t.centerY = 100;
    this.newTables.push(t);
    this.rooms.find((r) => r.name == roomName).tables.push(t);
    console.log(this.rooms);
  }
}
