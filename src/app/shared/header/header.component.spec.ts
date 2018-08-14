import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { Config } from '../../config';
import { HeaderComponent } from './header.component';

const config = new Config();

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [Config]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
    component.name = "products";
    fixture.detectChanges();
  });

  it('should render 5 links to the bookmarks', () => {
        let el = fixture.debugElement.queryAll(By.css('a'));
        expect(el.length).toBe(5);
  });
  it('should render log-out button with correct text and classes', () => {
        let el = fixture.debugElement.query(By.css('button'));
        let button = el.nativeElement;
        expect(button.innerHTML).toBe('Wyloguj');
        expect(button.getAttribute('class')).toBe('btn btn-danger btn-block logoutButton');
  });
  it('should render first link with an "active" class', () => {
        let el = fixture.debugElement.queryAll(By.css('a'));
        let native = el[0].nativeElement;
        expect(native.getAttribute('class')).toContain('active');
  });
  it('should render correct href-attributes', () => {
        let el = fixture.debugElement.queryAll(By.css('a'));
        let array = [];
        el.forEach(innerEl => {
            array.push(innerEl.nativeElement.getAttribute('href'));
        });
        expect(array).toEqual([ '/products', '/orders', '/postal', '/accounts', '/delivery' ]);
  });
});
