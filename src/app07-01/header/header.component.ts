import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html',
  	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Output() logOut = new EventEmitter();
  	constructor() { }

  	ngOnInit() {
  	}

  	logOutUser() {
  		this.logOut.emit();
  	}

}
