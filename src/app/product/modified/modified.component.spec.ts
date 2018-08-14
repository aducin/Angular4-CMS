import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Config } from '../../config';
import { ModifiedComponent } from './modified.component';

import { Message } from '../../shared/functions';
import { MessageService } from '../../service/message.service';
import { Modified } from '../../model/modified';
import { ProductService } from '../../service/product.service';

const config = new Config();
let modifiedData = [
    {
        date:"2018-08-13",
        id: 2172,
        link_rewrite: 'fake1',
        name: "Cysterna Greizer Schloß Pils - 1:87"
    },
    {
        date:"2018-08-12",
        id: 50,
        link_rewrite: 'fake1',
        name: 'Węglarka MAV - PIKO H0'
    },
    {
        date:"2018-08-11",
        id: 13,
        link_rewrite: 'fake3',
        name: 'Zestaw zderzaków - TT'
    }
];

class MockService {
  modify = new Subject();
  constructor() {}

  deleteAdditional(name, id) {
    let response = {
      success: true,
      reason: 'Skutecznie usunięto produkt o ID: ' + id
    };
    setTimeout(() => Observable.of(response), 500);
  }
  
  getModified() {
      return Observable.of(modifiedData);
  }
}

describe('ModifiedComponent', () => {
  let component: ModifiedComponent;
  let fixture: ComponentFixture<ModifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifiedComponent],
      imports: [LoadingModule],
      providers: [Config, MessageService, {provide: ProductService, useClass: MockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedComponent);
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
      expect(loadingEl.innerHTML).toContain('Proszę czekać - wyszukiwanie produktów podmienionych...');
  });
  it('should display a message when there is no result', () => {
    component.empty = true;
    component.searching = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Obecnie brak produktów zmodyfikowanych.');
  });
  it('will get list with 3 objects inside', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getModified')
    .and.returnValue(Observable.of(modifiedData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       expect(component.list.length).toBe(3);
    });
  }));
  it('will render the correct ID values', async(() => {
    let service = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(service, 'getModified')
    .and.returnValue(Observable.of(modifiedData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.queryAll(By.css('tr'));
      let native1 = el[0].nativeElement.children[1].children[0];
      expect(native1.innerHTML).toEqual('2172');
      let native2 = el[1].nativeElement.children[1].children[0];
      expect(native2.innerHTML).toEqual('50');
      let native3 = el[2].nativeElement.children[1].children[0];
      expect(native3.innerHTML).toEqual('13');
    });
  }));
});
