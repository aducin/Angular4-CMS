import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'postal-header',
	templateUrl: './postal-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostalHeaderComponent {
    
    @Output() openModal = new EventEmitter<string>();
    @Input() amount: any;

    open(action) {
        this.openModal.emit(action);
    }
}
