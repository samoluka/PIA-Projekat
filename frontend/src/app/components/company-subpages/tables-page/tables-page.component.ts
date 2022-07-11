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
    t.position = `translate3d(0px,0px,0px)`;
    t.name = this.newName;
    this.rooms.find((r) => r.name == roomName).tables.push(t);
    console.log(this.rooms);
  }
  saveRoomLayout(room: Room) {
    let skip = 0;
    let notfound = true;
    this.user.rooms.forEach((r) => {
      if (r.name != room.name && notfound) skip += r.tables.length;
      if (r.name == room.name) notfound = false;
    });
    let ind = 0;

    this.elements.forEach((e) => {
      if (skip > 0) {
        skip--;
        return;
      }
      if (ind < room.tables.length) {
        let p: string[] = e.nativeElement.style.transform.split(')');
        let patern = /translate3d\((-*[0-9]+)px, (-*[0-9]+)px, ([0-9]+)px/;
        let sumF = 0;
        let sumS = 0;
        console.log(`obradjujem: ${e.nativeElement.innerHtml}`);
        console.log('splitovano');
        console.log(p);
        p.forEach((s) => {
          const match = s.match(patern);
          if (match) {
            let first = Number.parseInt(match[1]);
            let second = Number.parseInt(match[2]);
            sumF += first;
            sumS += second;

            console.log(`${s} => ${first}, ${second}`);
          }
        });
        room.tables[ind].position = `translate3d(${sumF}px, ${sumS}px, 0px)`;
        // console.log(`translate3d(${sumF}px, ${sumS}px, 0px)`);
      }
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
