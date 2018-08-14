import { Directive, ElementRef, HostListener,Renderer2 } from '@angular/core';

@Directive({
  selector: '[cursorPointer]'
})
export class PointerDirective {
  	constructor(private el: ElementRef, private renderer: Renderer2) { }

	@HostListener('mouseenter') onMouseEnter() {
	    this.setCursor('pointer');
	}

    @HostListener('mouseleave') onMouseLeave() {
    	this.setCursor('none');
    }

    private setCursor(cursor: string) {
		this.renderer.setStyle(this.el.nativeElement, 'cursor', cursor);
    	//this.el.nativeElement.style.cursor = cursor;
  	}

}
