import { Component, OnInit, Input } from '@angular/core';

@Component({
  	selector: 'app-message',
  	templateUrl: './message.component.html'
      
})
export class MessageComponent implements OnInit {

	@Input() messageShow: boolean;
    @Input() messageType: string;
    @Input() messageValue: string;
  	constructor() { }

  	ngOnInit() {
  	}
}
