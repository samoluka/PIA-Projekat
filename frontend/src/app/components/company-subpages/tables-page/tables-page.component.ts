import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
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
  constructor(private userService: UserService) {}

  newWidth: number;
  newHeight: number;
  newName: string;
  newRoom: string;
  type: string;

  @ViewChildren('room.tables') elements: QueryList<any>;

  user: User;
  rooms: Room[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rooms = this.user.rooms;
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
    t.position = `translate3d(100px,100px,0px)`;
    t.name = this.newName;
    this.rooms.find((r) => r.name == roomName).tables.push(t);
    console.log(this.rooms);
  }
  saveRoomLayout(room: Room) {
    let skip = 0;
    let notfound = true;
    console.log(this.elements);
    this.user.rooms.forEach((r) => {
      if (r.name != room.name && notfound) skip += room.tables.length;
      if (r.name == room.name) notfound = false;
    });
    let ind = 0;
    console.log(skip);
    this.elements.forEach((e) => {
      if (skip > 0) {
        skip--;
        return;
      }
      if (ind < room.tables.length)
        room.tables[ind].position = e.nativeElement.style.transform;
      ind++;
    });
    this.userService
      .updateTables(this.user, room.name, room.tables)
      .subscribe((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.ngOnInit();
        }
      });
  }
  addRoom() {
    this.userService
      .addRoom(this.user, this.newRoom)
      .subscribe((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.ngOnInit();
        }
      });
  }
}
