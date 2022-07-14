import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/app/models/receipt';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService) {}

  receipts: Receipt[];

  ngOnInit(): void {
    this.userService.getLatest().subscribe((rec) => {
      this.receipts = rec.slice(0, 5);
    });
  }
}
