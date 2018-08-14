import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingModule } from 'ngx-loading';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Rx';

import { Config } from '../../config';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../service/product.service';
import { ProductShort } from '../../model/productShort';

const config = new Config();

let emptySearch = true;
let productList: ProductShort[] = [];
let searchInProgress = true;

class MockService {
  constructor() {}
}

const data = [
  {
    id: 2248,
    attribute: {
      new: 0,
      old: 0,
    },
	  image: 12444,
	  name: '2-osiowa cysterna DB - ROCO H0',
    price: {
      new: 42.00,
      old: 42.00,
    },
	  link_rewrite: '2-osiowa-cysterna-db-roco-h0',
    quantity: 0
  },
  {
    id: 2274,
    attribute: {
      new: 0,
      old: 0,
    },
	  image: 11791,
	  name: 'Szara cysterna CSD - Roco H0',
    price: {
      new: 47.00,
      old: 47.00,
    },
	  link_rewrite: 'szara-cysterna-csd-roco-h0',
    quantity: 1
  },
  {
    id: 2286,
    attribute: {
      new: 0,
      old: 0,
    },
	  image: 25978,
	  name: '2-osiowa srebrna cysterna - Roco H0',
    price: {
      new: 47.00,
      old: 47.00,
    },
	  link_rewrite: '2-osiowa-srebrna-cysterna-roco-h0',
    quantity: 1
  }
];

setTimeout(() => {
  productList = data;
  emptySearch = false;
  searchInProgress = false;
}, 500);

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [LoadingModule],
      providers: [
        Config, 
        {provide: NgbModal, useClass: MockService},
        {provide: ProductService, useClass: MockService},
        ProductShort
      ]
    })
    .compileComponents();
  }));
  afterEach(() => {
    component = null;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.emptySearch = true;
    component.productList = [];
    component.searchInProgress = true;
    fixture.detectChanges();
  });

  it('should create busy-indicator', () => {
    let el = fixture.debugElement.query(By.css('ngx-loading'));
    expect(el).toBeTruthy();
  });
  it('will render correct h3 title while loading', () => {
      let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Trwa wyszukiwanie - proszę czekać...');
  });
  it('should display a message when there is no result', () => {
    component.searchInProgress = false;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h3'));
      let loadingEl = el.nativeElement;
      expect(loadingEl.innerHTML).toContain('Nie znaleziono produktów spełniających określone kryteria.');
  });
  it('will show 3 list elements after 500 ms', async(() => {
    component.productList = productList;
    component.emptySearch = emptySearch;
    component.searchInProgress = searchInProgress;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       expect(component.productList.length).toBe(3);
    });
  }));
  it('will render correct IDs', async(() => {
    component.productList = productList;
    component.emptySearch = emptySearch;
    component.searchInProgress = searchInProgress;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.queryAll(By.css('.col-lg-1'));
      let native1 = el[0].nativeElement.children[0];
      let native2 = el[1].nativeElement.children[0];
      let native3 = el[2].nativeElement.children[0];
      expect(native1.innerHTML).toEqual('2248');
      expect(native2.innerHTML).toEqual('2274');
      expect(native3.innerHTML).toEqual('2286');
    });
  }));
  it('will render one button with correct classes', async(() => {
    component.productList = productList;
    component.emptySearch = emptySearch;
    component.searchInProgress = searchInProgress;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('button'));
      let native = el.nativeElement;
       expect(native.getAttribute('class')).toEqual('btn btn-danger btn-block');
    });
  }));
});
