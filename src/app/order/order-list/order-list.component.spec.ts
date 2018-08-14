import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

import { Config } from '../../config';
import { MessageService } from '../../service/message.service';
import { OrderService } from '../../service/order.service';
import { OrderListComponent } from './order-list.component';
import { TokenService } from '../../service/token.service';

const config = new Config();
const data = {
  customer: {
    id: 1475,
    firstname: 'testName',
    lastname: 'test',
    email: 'test@test.pl'
  },
  reference: "LSVDAVCEC",
  totalPaid: '180.50',
  totalProduct: '159.00',
  totalShipment: '21.50',
  payment: "pobranie",
  cartDetails: [{
    productId: 67,
    attributeId: 0,
    productName: "Kryty pruski typu Berlin z brekiem - PIKO H0",
    productQuantity: 1,
    reduction: "---",
    totalPrice: "55.00",
    unitPrice: "55.00",
    counter: 1,
    totalPriceDiscount: "46.75",
    unitPriceDiscount: "46.75",
    linkRewrite: "kryty-pruski-typu-berlinz-brekiem-piko-h0",
    quantity: {
      current: 0,
      toUpdate:0
    },
    cover: "http:\/\/modele-ad9bis.pl\/img\/p\/67-28140-thickbox.jpg"
  },
  {
    productId: 508,
    attributeId: 0,
    productName: "\u0141uk R 440 dawnego PIKO- nieu\u017cywany",
    productQuantity: 10,
    reduction: "---",
    totalPrice: "35.00",
    unitPrice: "3.50",
    counter: 2,
    totalPriceDiscount: "29.75",
    unitPriceDiscount: "2.98",
    linkRewrite: "standartowy-tor-lukowy-piko",
    quantity: {
      current: 114,
      toUpdate: 114
    },
    cover: "http:\/\/modele-ad9bis.pl\/img\/p\/508-6065-thickbox.jpg"
  },
  {
    productId: 1880,
    attributeId: 0,
    productName: "3. klasa kolei EBT - Liliput H0",
    productQuantity: 1,
    reduction: "---",
    totalPrice: "69.00",
    unitPrice: "69.00",
    counter: 3,
    totalPriceDiscount: "58.65",
    unitPriceDiscount: "58.65",
    linkRewrite: "1-klasa-db-typu-donnerbuchsen-2-roco-h0",
    quantity: {
      current: 1,
      toUpdate: 1
    },
    cover: "http:\/\/modele-ad9bis.pl\/img\/p\/1880-29566-thickbox.jpg"
  }]
}

class MockService {
  loading = new Subject();
  loadingFinished = new Subject();

  constructor() {}

  getOrder() {
    return Observable.of(data);
  }
  
  getToken() {
    return 'test_token';
  }
}

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListComponent],
      imports: [FormsModule, LoadingModule, RouterTestingModule],
      providers: [
        Config, 
        MessageService,
        {provide: ActivatedRoute, useValue: {snapshot: {
          params: {'db': 'old', 'id': '50'},
          url: []
        }}},
        {provide: OrderService, useClass: MockService},
        {provide: TokenService, useClass: MockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    component.action = 'order';
    fixture.detectChanges();
  });
  it('will render busy-indicator while loading in progress', () => {
    component.empty = true;
    component.searching = true;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('ngx-loading'));
    expect(el).toBeTruthy();
  });
  it('will render correct h3 title while loading', () => {
      component.empty = true;
      component.searching = true;
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('h3'));
      let searchingEl = el.nativeElement;
      expect(searchingEl.innerHTML).toContain(config.waiting);
  });
  it('should display a message when there is no result', () => {
    component.empty = true;
    component.searching = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h3'));
      let searchingEl = el.nativeElement;
      expect(searchingEl.innerHTML).toContain('Brak podanego numeru zamówienia!');
  });
  it('should get an 3 array rows', async (() => {
    let service = fixture.debugElement.injector.get(OrderService);
    let spy = spyOn(service, 'getOrder')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.cardDetails.length).toBe(3);
    });
  }));
  it('should render a table with 3 rows', async (() => {
    let service = fixture.debugElement.injector.get(OrderService);
    let spy = spyOn(service, 'getOrder')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('tbody'));
      let native = el.nativeElement.children;
      expect(native.length).toBe(3);
    });
  }));
  it('should render correct IDs', async (() => {
    let service = fixture.debugElement.injector.get(OrderService);
    let spy = spyOn(service, 'getOrder')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('tbody'));
      let native1 = el.nativeElement.children[0].children[1];
      let native2 = el.nativeElement.children[1].children[1];
      let native3 = el.nativeElement.children[2].children[1];
      expect(native1.innerHTML).toEqual('67');
      expect(native2.innerHTML).toEqual('508');
      expect(native3.innerHTML).toEqual('1880');
    });
  }));
  it('should render correct customer name', async (() => {
    let service = fixture.debugElement.injector.get(OrderService);
    let spy = spyOn(service, 'getOrder')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('h4'));
      let native = el.nativeElement;
      expect(native.innerHTML).toEqual('testName test');
    });
  }));
});
