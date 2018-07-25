import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Account } from '../../model/account';
import { AccountSummary } from '../../model/accountSummary';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input() accountList: Account[];
  @Input() amount: number;
  @Input() automatic: boolean;
  @Input() empty:boolean;
  @Input() loading:boolean;
  @Input() total = {
    amount: <number> 0,
    amountIt: <number> 0,
    locs: <number> 0,
    coach: <number> 0,
    element: <number> 0,
    accessories: <number> 0,
    book: <number> 0,
    car: <number> 0,
    tax: <number> 0,
    taxIt: <number> 0
  };
  @Output() setSelected = new EventEmitter<number>();
  selected: number = 0;
  sortBy: string = 'id';
  sortReverse: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  reSort(field) {
    if (field === this.sortBy) {
      this.sortReverse = !this.sortReverse;
    }
    this.sortBy = field;
  }

  setActive(id) {
    let check = this.accountList.findIndex(el => {
      return el.id === id;
    });
    var closed = false;
    if (check !== -1) {
      closed = this.accountList[check].closed === 1;
    }
    if (!closed) {
      this.selected = this.selected !== id ? id : 0;
      this.setSelected.emit(id);
    } else {
      this.selected = 0;
      this.setSelected.emit(-1);
    }
  }

}
