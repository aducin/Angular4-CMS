import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[inputActive]',
})
export class ActiveDirective implements OnInit {
  colorActive: string = '#FCF18F';
  colorInActive: string = '#FFFFFF';

  @Input() disabled: boolean;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.handleFocus(this.colorInActive);
  }

  @HostListener('blur') onBlur() {
    this.handleFocus(this.colorInActive);
  }

  @HostListener('focus') onFocus() {
    if (!this.disabled) {
      this.handleFocus(this.colorActive);
    } 
  }
  
  private handleFocus(style: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', style);
  }
}
