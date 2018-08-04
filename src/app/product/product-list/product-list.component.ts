import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { ProductShort } from '../../model/productShort';
import { ProductService } from '../../service/product.service';
import { ModalProductBasic } from '../../modal/productBasic.component';


@Component({
	selector: 'product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
    encapsulation: ViewEncapsulation.None,
	styles: [`
		.current-modal {
			position: fixed;
			top: 10%;
		}
		.modal-content {
			width: 120%;
		}`
	]
})
export class ProductListComponent implements OnInit {
	subscription: any;

	@Input() productList: ProductShort[];
	@Input() emptySearch: boolean;
	@Input() url: string;
	@Input() imagePath: string;
	@Input() listLength: number;
	@Input() searchInProgress: boolean;
	@Output() deleteList = new EventEmitter();
  	constructor(
		  private service: ProductService, 
		  private productShort: ProductShort, 
		  private modalService: NgbModal
	) { }

	ngOnInit() {}

	ngAfterViewInit() {
		this.subscription = Observable.fromEvent(document.getElementsByClassName("quickSearch"), 'click')
		.flatMap((e: any) => this.service.getIdSearch(e.target.id, 'list'))
		.subscribe(response => this.service.emitSingleData(response), 
        (err => console.log(err.message))); 
  	}

  	clearList() {
  		this.deleteList.emit();
  	}

  	displayEdition(id) {
  		var url = '#/products/edition/' + id;
  		window.location.href = url;
  	}

  	open(id) {
  		this.service.getIdSearch(id, 'list');
  	}

  	setDetails(el) {
		el.imgPath = this.url + this.imagePath + el.id + '-' + el.image + '-thickbox.jpg';
		if (!el.discount.new && !el.discount.old) {
			var block = false;
			el.priceReal = {
				new: el.price.new,
				old: el.price.old,
			};
		} else {
			var block = true;
			var discountValue = 0;
			el.priceReal = {
				new: null,
				old: null,
			};
			if (el.discount.new.reduction !== undefined) {
				if (el.discount.new.reductionType === 'amount') {
					el.priceReal.new = Math.round((el.price.new - el.discount.new.reduction) * 100) / 100;
				} else if (el.discount.new.reductionType === 'percentage') {
					let curAmount = el.price.new * (el.discount.new.reduction / 100);
					el.priceReal.new = Math.round((el.price.new - curAmount) * 100) / 100;
				}
				discountValue++;
			}
			if (el.discount.old.reduction !== undefined) {
				if (el.discount.old.reductionType === 'amount') {
					el.priceReal.old = Math.round((el.price.old - el.discount.old.reduction) * 100) / 100;
				} else if (el.discount.old.reductionType === 'percentage') {
					let curAmount = el.price.old * (el.discount.old.reduction / 100);
					el.priceReal.old = Math.round((el.price.old - curAmount) * 100) / 100;
				}
				discountValue++;
			}
			el.priceBlock = block;
			el.discountValue = discountValue;
		}
		return el;
	}
}

