import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Rx';

import { Config } from '../config';
import { LoginComponent } from './login.component';
import { LoginService } from '../service/login.service';
import { TokenService } from '../service/token.service';

const data = {
  success: true,
  reason: 'User logged in!',
  token: 'test_token',
  user: 'test_user'
}
class MockService {
  token: string = '';

  constructor() {}

  getToken() {
      return this.token;
  }

  logIn() {
    return Observable.of(data);
  }

  setNewToken(value: string) {
		this.token = value;	
	}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        CookieService, 
        Config, 
        {provide: LoginService, useClass: MockService},
        {provide: TokenService, useClass: MockService},
        [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.disabledFields = false;
    component.login = '';
	  component.password=  '';
    fixture.detectChanges();
  });

  it('should create 2 text input fields', () => {
    let el = fixture.debugElement.queryAll(By.css('input'));
    let native1 = el[0].nativeElement;
    let native2 = el[1].nativeElement;
    expect(native1.name).toBe('userLogin');
    expect(native2.name).toBe('userPassword');
    expect(native1.getAttribute('minlength')).toBe('5');
    expect(native2.getAttribute('minlength')).toBe('5');
    expect(native1.getAttribute('class')).toEqual('form-control textAlignCenter ng-untouched ng-pristine ng-valid');
  });
  it('should disable inputs after state changed', async(() => {
    component.disabledFields = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.queryAll(By.css('input'));
      let native1 = el[0].nativeElement;
      let native2 = el[1].nativeElement;
      expect(native1.disabled).toBeTruthy();
      expect(native2.disabled).toBeTruthy();
    });
  }));
  it('should log in user after login action', async(() => {
    component.login = 'test_login';
    component.password = 'test_password';
    component.remember = false;
    fixture.detectChanges();
    let service = fixture.debugElement.injector.get(LoginService);
    let spy = spyOn(service, 'logIn')
    .and.returnValue(Observable.of(data));
    component.logIn();
    fixture.whenStable().then(() => {
      expect(component.loggedIn).toBeTruthy();
      expect(component.result).toEqual('User logged in!');
    });
  }));
});
