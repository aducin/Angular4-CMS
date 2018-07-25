import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
 	id: number;
 	empty: boolean = false;
 	list: any[];
 	error: boolean = false;
	constructor(private service: ProductService, private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.id = this.route.snapshot.params.id;
  		this.getData();
  	}

  	getData() {
  		this.service.getHistory(this.id)
  		.subscribe( data => {
  		console.log(data);
			if (data.success !== undefined && data.success === false) {
				if (data.reason === 'no data') {
				      this.empty = true;
				} else {
				      this.error = true;
				}
			} else {
				this.list = data;
				this.empty = false;
				this.error = false;
			} 
  			this.list = data;
  		});	
  	}

  	setUrl(target = null) {
  		if (!target) {
  			var url = '#/products/';
  		} else {
  			var url = '#/products/edition/' + this.id;
  		}
  		window.location.href = url;
  	}

}
