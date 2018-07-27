import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Config } from '../../config';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	bookmarks: any[];

	@Input() name: string;	
	@Output() logOut = new EventEmitter();
  	constructor(private config: Config) {
		this.bookmarks = this.config.bookmarks;
	}

  	ngOnInit() {
  	}

  	logOutUser() {
  		this.logOut.emit();
  	}

}
