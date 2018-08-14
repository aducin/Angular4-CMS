
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Ng4FilesModule } from '../../../../node_modules/angular4-files-upload/src/app/ng4-files';
import { LoadingModule } from 'ngx-loading';
import { OrderPipe } from 'ngx-order-pipe';

import { Config } from '../../config';
import { Delivery } from '../../model/delivery';
import { DeliveryListComponent } from './delivery-list.component';
import { DeliveryService } from '../../service/delivery.service';
import { MessageService } from '../../service/message.service';

const config = new Config();
const data = {
  success: true,
  empty: false,
  list: [
    {
      id: 4,
      number: "PT\/E-01\/18",
      name: "test_name",
      deliveryFile: "PT-01.pdf",
      paymentFile: null,
      auctionFile: null,
      locs: null,
      coaches: 8,
      elements: null,
      accessories: 130,
      cars: null,
      books: null,
      toPrint: 1,
      type: 1,
      documentDate: "2018-03-20",
      documentDateStamp: 1521500400
    },
    {
      id: 3,
      number: "PT-G02\/18",
      name: "test_name2",
      deliveryFile: "PT-G02.pdf",
      paymentFile: null,
      auctionFile: null,
      locs: null,
      coaches: 49,
      elements: 500,
      accessories: 510,
      cars: null,
      books: null,
      toPrint: 3,
      type: 2,
      documentDate: "2018-03-26",
      documentDateStamp: 1522015200
    }
  ]
}
class MockService {
  constructor() {}
}

let deliveryList: Delivery[] = [];
let empty = true;
let loading = true;

setTimeout(() => {
  deliveryList = data.list;
  empty = false;
  loading = false;
}, 500);

describe('DeliveryListComponent', () => {
  let component: DeliveryListComponent;
  let fixture: ComponentFixture<DeliveryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryListComponent, OrderPipe],
      imports: [LoadingModule, Ng4FilesModule],
      providers: [
        Config, 
        {provide: DeliveryService, useClass: MockService},
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryListComponent);
    component = fixture.componentInstance;
    component.automatic = true;
    component.deliveryList = [];
    component.empty = true;
    component.loading = true;
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
      expect(loadingEl.innerHTML).toContain('Brak dokumentów spełniających określone kryteria');
  });
  it('will contain a list with 2 elements after 500 ms', async(() => {
    component.deliveryList = deliveryList;
    component.amount = deliveryList.length;
    component.empty = empty;
    component.loading = loading;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       expect(component.amount).toBe(2);
    });
  }));
  it('will render correct message about automatic accounts', async(() => {
    component.deliveryList = deliveryList;
    component.amount = deliveryList.length;
    component.empty = empty;
    component.loading = loading;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('h3'));
      let native = el.nativeElement;
      expect(native.innerHTML).toEqual('Lista przyjęć (ostatnie 2)');
    });
  }));
  it('will render correct names inside a delivery table', async(() => {
    component.deliveryList = deliveryList;
    component.amount = deliveryList.length;
    component.empty = empty;
    component.loading = loading;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('tbody'));
      let native1 = el.nativeElement.children[0].children[1];
      let native2 = el.nativeElement.children[1].children[1];
      expect(native1.innerHTML).toEqual('test_name');
      expect(native2.innerHTML).toEqual('test_name2');
    });
  }));
});
