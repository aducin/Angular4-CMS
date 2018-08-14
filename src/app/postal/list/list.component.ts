import { Component, Input } from '@angular/core';

import { Postal } from '../../model/postal';
import { Config } from '../../config';

@Component({
  selector: 'postal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {
	loadingMessage: string;
	
	@Input() loading:boolean;
	@Input() postalList: Postal[];
	constructor(private config: Config) { 
		this.loadingMessage = this.config.loading;
	}
}
