import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import { Message } from '../../shared/functions';
import { MessageService } from '../../service/message.service';
import { Modified } from '../../model/modified';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'modified',
  templateUrl: './modified.component.html',
  styleUrls: ['./modified.component.css']
})
export class ModifiedComponent implements OnInit {
	empty: boolean = true;
  list: Modified[];
  searching: boolean = true;
  @Input() url: string;

  constructor(
    private messageService: MessageService,
    private service: ProductService
  ) { 
    this.service.modify.subscribe((data) => this.getData());
  }

  ngOnInit() {
    this.getData();
  }

  delete(id) {
  	this.service.deleteAdditional('modified', id)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			this.messageService.setMessage( Message(curType, data.reason) );
			this.getData();
		});
  }

  getData() {
    this.searching = true;
    this.service.getModified()
		.subscribe( data => {
			if (data[0] !== undefined) {
				this.list = data;
				this.empty = false;
			} else {
				this.empty = true;
			}
			this.searching = false;
		});
  }
}
