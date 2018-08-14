import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng4FilesModule, Ng4FilesService } from '../../../../node_modules/angular4-files-upload/src/app/ng4-files';

import { Observable } from 'rxjs/Rx';

import { Config } from '../../config';
import { PrintingComponent } from './printing.component';
import { MessageService } from '../../service/message.service';
import { ProductService } from '../../service/product.service';

const config = new Config();
const data = {
  success: true,
  list: [
    {
      id: 5,
      name: "print_(21).pdf",
      description: "Potwierdzenie wp\u0142aty za ...",
      createdTime: "2018-08-06"
    },
    {
      id: 6,
      name: "eBay_test.pdf",
      description: "Potwierdzenie zakupu - eBay...",
      createdTime: "2018-08-05"
    }
  ],
  empty: false,
  emptyDelivery: false,
  deliveryList: [{
    number: "PT\/E-01\/18",
    name: 'test'
  }]
};

class MockService {
  constructor() {}

  getPrinting() {
    return Observable.of(data);
  }
}

describe('PrintingComponent', () => {
  let component: PrintingComponent;
  let fixture: ComponentFixture<PrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintingComponent],
      imports: [LoadingModule, Ng4FilesModule],
      providers: [
        Config, 
        MessageService, 
        Ng4FilesService, 
        {provide: NgbModal, useClass: MockService},
        {provide: ProductService, useClass: MockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingComponent);
    component = fixture.componentInstance;
    component.url = 'test_url';
    component.token = 'test_token';
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
      expect(loadingEl.innerHTML).toContain('Proszę czekać - wyszukiwanie dokumentów do wydruku...');
  });
  it('should display a message when there is no result', () => {
    component.empty = true;
    component.searching = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Obecnie brak dokumentow do wydruku.');
  });
  it('component will get 2 table rows', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getPrinting')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       expect(component.list.length).toBe(2);
    });
  }));
  it('will render correct document dates inside the table', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getPrinting')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       let el = fixture.debugElement.queryAll(By.css('tbody'));
       let native1 = el[0].nativeElement.children[0].children[3].children[0];
       let native2 = el[0].nativeElement.children[1].children[3].children[0];
       expect(native1.innerHTML).toEqual('2018-08-06');
       expect(native2.innerHTML).toEqual('2018-08-05');
    });
  }));
  it('will render a paragraph if deliveryList present', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getPrinting')
    .and.returnValue(Observable.of(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       let el = fixture.debugElement.queryAll(By.css('p'));
       let native = el[0].nativeElement;
       expect(native.innerHTML).toEqual('UWAGA - przyjęcie towaru do wydruku (ilość: 1)');
    });
  }));
});
