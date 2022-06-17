import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/commonService.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-company-additional-info-page',
  templateUrl: './company-additional-info-page.component.html',
  styleUrls: ['./company-additional-info-page.component.css'],
})
export class CompanyAdditionalInfoPageComponent implements OnInit {
  constructor(
    private service: UserService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  //   категорију предузећа (продавница или угоститељски објекат);
  //  шифра делатности (може их бити и више, узимају се из шифарника);
  //  да ли је предузеће у систему ПДВ или није – поље за потврду;
  //  пословне жиро рачуне (број рачуна и банку код које је рачун регистрован);
  // свако предузеће може имати више жиро рачуна; број жиро рачуна је увек у
  // следећем формату: [3_цифре]-[12_цифара]-[2_цифре].
  //  број магацина који жели да има (подразумевано 1); сваки магацин мора имати
  // свој јединствени идентификатор и назив;
  //  број фискалних каса које поседује у објектима свог предузећа (подразумевано
  // 1); за сваку касу предузеће треба да унесе локацију објекта и тип касе (бира
  // се из падајуће листе од неколико модела).

  user: User;
  category: string;
  code: string;
  pdv: boolean;
  message: string;

  saveAdditionInfo() {
    const data = {
      category: this.category,
      code: this.code,
      pdv: this.pdv,
    };
    this.service.setCompanyAdditionInfo(this.user, data).subscribe({
      next: (v: any) => {
        localStorage.setItem('user', JSON.stringify(v['user']));
        this.commonService.sendUpdate('ok');
      },
      error: (e) => {
        this.message = e.error['message'];
      },
    });
  }
}
