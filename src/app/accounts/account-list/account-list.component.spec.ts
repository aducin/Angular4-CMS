import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';
import { OrderModule } from 'ngx-order-pipe';

import { AccountListComponent } from './account-list.component';
import { Account, Totals } from '../../model/account';
import { Config } from '../../config';

const config = new Config();
const list: Account[] = [
  {
      accessories: 5,
      address: null,
      amount: '10.99',
      amountFloat: 10.99,
      book: null,
      car: null,
      cashTime: "2018-06-21",
      cashTimestamp: 1111,
      closed: 1,
      coach: null,
      createTime: "2018-06-21 00:00:00",
      createTimestamp: 2222,
      element: 10,
      id: 1000,
      locs: null,
      receipt: 9834,
      receiptTime: "2018-06-22",
      recipient: 'PayU',
      type: 1,
      typeName: 'przelew'
    },
    {
      accessories: 2,
      address: null,
      amount: '20.99',
      amountFloat: 20.99,
      book: null,
      car: null,
      cashTime: "2018-06-21",
      cashTimestamp: 3333,
      closed: 1,
      coach: null,
      createTime: "2018-06-21 00:00:00",
      createTimestamp: 4444,
      element: 20,
      id: 1001,
      locs: null,
      receipt: 9834,
      receiptTime: "2018-06-22",
      recipient: 'PayU',
      type: 1,
      typeName: 'przelew'
    }
];
const total: Totals = {
  amount: 31.98,
  amountIt: 0,
  locs: 0,
  coach: 0,
  element: 30,
  accessories: 7,
  book: 0,
  car: 0,
  tax: 0.96,
  taxIt: 0
};
let asyncList: Account[];
let asyncTotal: Totals;
let empty = true;
let listLength: number = 0;
let loading;

setTimeout(() => {
  asyncList = list;
  asyncTotal = total;
  empty = false;
  listLength = list.length;
  loading = false;
}, 500);

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountListComponent ],
      imports: [LoadingModule, OrderModule],
      providers: [Config]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.debugElement.componentInstance;
    component.empty = true;
    component.loading = true;
    component.accountList = [];
    component.automatic = true;
    fixture.detectChanges();
  });
  it('will render busy-indicator while loading in progress', () => {
    let el = fixture.debugElement.query(By.css('ngx-loading'));
    expect(el).toBeTruthy();
  });
  it('will render correct h3 title while loading', () => {
      let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain(config.loading);
  });
  it('should display a message when there is no result', () => {
    component.loading = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Brak rachunków spełniających określone kryteria');
  });
  it('will contain a list with 2 elements after 500 ms', async(() => {
    component.accountList = asyncList;
    component.amount = asyncList.length;
    component.total = asyncTotal;
    component.empty = empty;
    component.loading = loading;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       expect(component.amount).toBe(2);
    });
  }));
  it('will render correct message about automatic accounts', async(() => {
    component.accountList = asyncList;
    component.amount = asyncList.length;
    component.total = asyncTotal;
    component.empty = empty;
    component.loading = loading;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('h3'));
      let native = el.nativeElement;
      expect(native.innerHTML).toEqual('Lista rachunków (ostatnie 2)');
    });
  }));
  it('will render correct amounts inside an account table', async(() => {
    component.accountList = asyncList;
    component.amount = asyncList.length;
    component.total = asyncTotal;
    component.empty = empty;
    component.loading = loading;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('tbody'));
      let native1 = el.nativeElement.children[0].children[3];
      let native2 = el.nativeElement.children[1].children[3];
      expect(native1.innerHTML).toEqual('20.99');
      expect(native2.innerHTML).toEqual('10.99');
    });
  }));
});
