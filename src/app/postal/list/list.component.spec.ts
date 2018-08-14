import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';

import { ListComponent } from './list.component';
import { Postal } from '../../model/postal';
import { Config } from '../../config';

const config = new Config();
const data = {
  list: [
    {
      number: 1,
      current: 80.60,
      date: "2018-06-20 18:24:18"
    },
    {
      number: 2,
      current: 71.55,
      date: "2018-06-20 13:08:14"
    },
    {
      number: 3,
      current: 102.50,
      date: "2018-06-18 16:53:44"
    }
  ],
  success: true,
  current: 80.60
};
let postalList: Postal[] = data.list;
let asyncList: Postal[];
let secondAsyncList: Postal[];
setTimeout(() => asyncList = data.list, 500);
//setTimeout(() => secondAsyncList.push(asyncList[0]), 1000); this throws an error in the previous file - no idea why...

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [LoadingModule],
      providers: [Config]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.debugElement.componentInstance;
    component.loading = true;
    component.postalList = [];
    fixture.detectChanges();
  });
  afterEach(() => {
    component = null;
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
  it('will get asynchronously list with 3 rows', async(() => {
    component.postalList = asyncList;
    component.loading = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.postalList.length).toBe(3);
    });
  }));
  it('will get the correct value', async(() => {
    component.postalList = asyncList;
    component.loading = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.queryAll(By.css('label'));
      let native1 = el[1].nativeElement;
      let native2 = el[4].nativeElement;
      let native3 = el[7].nativeElement;
      expect(native1.innerHTML).toEqual('80.6zł');
      expect(native2.innerHTML).toEqual('71.55zł');
      expect(native3.innerHTML).toEqual('102.5zł');
    });
  }));
});
