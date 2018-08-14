import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Config } from '../../config';
import { NewestOrderComponent } from './newest-order.component';
import { MessageService } from '../../service/message.service';
import { ProductService } from '../../service/product.service';

const config = new Config();
const data = {
  success: true,
  last: {
    new: 563,
    old: 2880
  },
  list: {
    new: [{
      id: 564,
      dateAdd: "2018-08-13",
      reference: 'AAABBB',
      totalProduct: 99.90,
      totalShipping: 12.00
    }],
    old: [{
      id: 2881,
      dateAdd: "2018-08-12",
      reference: 'AAABBBCCC',
      totalProduct: 50.90,
      totalShipping: 9.50
    }]
  },
  newest: {
    new: 564,
    old: 2881
  }
};
class MockService {
  interval = new Subject();
  constructor() {}

  deleteNewest(db, id) {
    let response = {
      success: true,
      reason: 'Skutecznie usunięto zamówienie o ID: ' + id
    };
    return Observable.of(response);
  }

  getNewestOrders() {
    return Observable.of(data);
  }
}

describe('NewestOrderComponent', () => {
  let component: NewestOrderComponent;
  let fixture: ComponentFixture<NewestOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewestOrderComponent],
      imports: [LoadingModule],
      providers: [Config, MessageService, {provide: ProductService, useClass: MockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestOrderComponent);
    component = fixture.debugElement.componentInstance;
    component.url = 'test_url';
    fixture.detectChanges();
  });
  afterEach(() => {
    component = null;
  });

  it('should create busy-indicator', () => {
    component.searching = true;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('ngx-loading'));
    expect(el).toBeTruthy();
  });
  it('will render correct h3 title while loading', () => {
      component.searching = true;
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Proszę czekać - wyszukiwanie nowych zamówień...');
  });
  it('should display a message when there is no result', () => {
    component.listNew = undefined;
    component.listOld = undefined;
    component.searching = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Brak nowych zamówień w obu panelach.');
  });
  it('will get 2 tables', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getNewestOrders')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       let el = fixture.debugElement.queryAll(By.css('table'));
       expect(el.length).toBe(2);
    });
  }));
  it('will render correct IDs inside the tables', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getNewestOrders')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       let el = fixture.debugElement.queryAll(By.css('tbody'));
       let native1 = el[0].nativeElement.children[0].children[0];
       let native2 = el[1].nativeElement.children[0].children[0];
       expect(native1.innerHTML).toEqual('564');
       expect(native2.innerHTML).toEqual('2881');
    });
  }));
});
