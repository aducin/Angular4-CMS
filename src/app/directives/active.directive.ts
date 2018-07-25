import { Directive, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[active]',
})
export class ActiveDirective {

  selected: number = 0;
  @Input() id: number;
  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
	  this.handleActive(this.id);
  }
  
  private handleActive(id: number) {
    if (this.id !== this.selected) {
      this.selected = this.id;
      this.el.nativeElement.style.backgroundColor = '#7d6464';
    } else {
      this.selected = 0;
      this.el.nativeElement.style.backgroundColor = null;
    }
  }

}
