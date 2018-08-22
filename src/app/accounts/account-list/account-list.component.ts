import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Account, Totals } from '../../model/account';
import { IconComponent } from '../../shared/icon.component'; 
import { AccountSummary } from '../../model/accountSummary';
import { Config } from '../../config';
import HeaderList from '../../model/headerList';
import { Labels } from '../../labels';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
  headerList: HeaderList[];
  label: {};
  loadingMessage: string;
  selected: number = 0;
  sortBy: string = 'id';
  sortReverse: boolean = true;

  @Input() accountList: Account[];
  @Input() amount: number;
  @Input() automatic: boolean;
  @Input() empty:boolean;
  @Input() loading:boolean;
  @Input() total: Totals;
  @Output() setSelected = new EventEmitter<number>();
  constructor(private config: Config, private labels: Labels) { 
    this.headerList = this.config.accountListHeaders;
    this.label = this.labels.account;
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
    let closed = false;
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
