import { Component, Input, OnInit } from '@angular/core';
import { Postal } from '../../model/postal';

@Component({
  selector: 'postal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
	@Input() loading:boolean;
	@Input() postalList: Postal;
	constructor() { }

	ngOnInit() {
	}
}
