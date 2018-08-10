import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import { Message } from '../../shared/functions';
import { MessageService } from '../../service/message.service';
import { NewestOrder } from '../../model/newestOrder';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'newest-order',
  templateUrl: './newest-order.component.html',
  styleUrls: ['./newest-order.component.css']
})
export class NewestOrderComponent implements OnInit {
  listNew: NewestOrder[];
	listOld: NewestOrder[];
  newestOrders: { new: number, old: number };
  searching: boolean = true;
  subscription;
  @Input() url: string;

  constructor(
    private messageService: MessageService,
    private service: ProductService
  ) {
    this.subscription = this.service.interval.subscribe( () => this.getData() );
  }

  ngOnInit() {
    this.getData();
  }

  delete(db, id) {
    delete(this.listNew);
		delete(this.listOld);
		this.service.deleteNewest(db, id)
			.subscribe( data => {
				let curType = data.success !== false ? 'success' : 'error';
			  this.messageService.setMessage( Message(curType, data.reason) );
        this.getData();
			});
  }

   getData() {
     this.searching = true;
     this.service.getNewestOrders()
			.subscribe( data => {
				if (data.success) {
					this.newestOrders = data.newest;
					if (data.list.new) {
						this.listNew = data.list.new;
					}
					if (data.list.old) {
						this.listOld = data.list.old;
					}
				}
				this.searching = false;
			});
   }
}
