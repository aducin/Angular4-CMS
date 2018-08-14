import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      imports: [],
      providers: []
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.debugElement.componentInstance;
    component.messageShow = true;
    component.messageType = 'success';
    component.messageValue = 'Test message';
    fixture.detectChanges();
  });

  it('should render a div containing "alert-success" class', () => {
        let el = fixture.debugElement.queryAll(By.css('div'));
        let native = el[0].nativeElement.children[1].children[0];
        expect(native.getAttribute('class')).toContain('alert-success');
  });
  it('should render a div containing correct text', () => {
        let el = fixture.debugElement.queryAll(By.css('div'));
        let native = el[0].nativeElement.children[1].children[0];
        expect(native.innerHTML).toContain('Test message');
  });
  it('should render a div containing "alert-danger" class', () => {
        component.messageType = 'error';
        fixture.detectChanges();
        let el = fixture.debugElement.queryAll(By.css('div'));
        let native = el[0].nativeElement.children[1].children[0];
        expect(native.getAttribute('class')).toContain('alert-danger');
  });
  it('should render a div containing another text', () => {
        component.messageType = 'error';
        component.messageValue = 'Error test message';
        fixture.detectChanges();
        let el = fixture.debugElement.queryAll(By.css('div'));
        let native = el[0].nativeElement.children[1].children[0];
        expect(native.innerHTML).toEqual('<strong>UWAGA</strong> Error test message');
  });
});
