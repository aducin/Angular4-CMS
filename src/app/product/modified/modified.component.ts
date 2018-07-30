import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Modified } from '../../model/modified';

@Component({
  selector: 'modified',
  templateUrl: './modified.component.html',
  styleUrls: ['./modified.component.css']
})
export class ModifiedComponent{
	@Input() modified: Modified;
	@Input() modifiedEmpty: boolean;
  @Input() modifiedSearch: boolean;
  @Input() url: string;
	@Output() deleteRow = new EventEmitter<number>();
  constructor() { }

  delete(id) {
  	this.deleteRow.emit(id);
  }

}
