import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[cursorPointer]'
})
export class PointerDirective {
  	constructor(private el: ElementRef) { }

	@HostListener('mouseenter') onMouseEnter() {
	    this.setCursor('pointer');
	}

    @HostListener('mouseleave') onMouseLeave() {
    	this.setCursor('none');
    }

    private setCursor(cursor: string) {
    	this.el.nativeElement.style.cursor = cursor;
  	}

}
