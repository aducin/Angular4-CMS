import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	@Input() name: string;	
	@Output() logOut = new EventEmitter();
  	constructor() {}

  	ngOnInit() {
  	}

  	logOutUser() {
  		this.logOut.emit();
  	}

}
