import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Rx';

import { Config } from '../../config';
import { ProductService } from '../../service/product.service';
import { HistoryComponent } from './history.component';

const data = [
  {
    dataBase: "old",
    date: "2018-08-09 23:39:51",
    lp: 1,
    id: 50,
    quantity: 2,
    user: 'test_user'
  },
  {
    dataBase: "old",
    date: "2018-08-08 12:49:51",
    lp: 2,
    id: 50,
    quantity: 3,
    user: 'test_user'
  },
  {
    dataBase: "old",
    date: "2018-07-10 18:30:51",
    lp: 3,
    id: 50,
    quantity: 0,
    user: 'second_user'
  }
];

const emptyData = {
  success: false,
  reason: 'no data'
}

class MockService {
  id: number;
  constructor() {}

  getHistory(id) {
      this.id = id;
      return Observable.of(data);
  }

  setUrl(target = null) {
  		if (!target) {
  			var url = '#/products/';
  		} else {
  			var url = '#/products/edition/' + this.id;
  		}
  		window.location.href = url;
  }
}

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [],
      providers: [
        Config, 
        {provide: ActivatedRoute, useValue: {snapshot: {params: {'id': '50'}}}},
        {provide: ProductService, useClass: MockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    component.empty = false;
    component.error = false;
    component.list = [];
    fixture.detectChanges();
  });

  it('should contain list with 3 elements', () => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getHistory')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.list.length).toBe(3);
    });
  });
  it('should render a table with 3 rows', () => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getHistory')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.queryAll(By.css('tr'));
      expect(el.length).toBe(3);
    });
  });
  it('should render correct quantities', () => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getHistory')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('tbody'));
      let native1 = el.nativeElement.children[0].children[3];
      let native2 = el.nativeElement.children[1].children[3];
      let native3 = el.nativeElement.children[2].children[3];
      expect(native1.innerHTML).toEqual('2');
      expect(native2.innerHTML).toEqual('3');
      expect(native3.innerHTML).toEqual('0');
    });
  });
  it('should render correct title when empty', () => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getHistory')
    .and.returnValue(Observable.of(emptyData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('h2'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Historia zmian produktu ID: 50');
    });
  });
});
