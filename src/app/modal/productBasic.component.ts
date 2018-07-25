import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from '../service/product.service';
import { Response } from '../model/response';
import { Config } from '../config';

@Component({
	selector: 'modal-product-basic',
	templateUrl: './productBasic.html'
})
export class ModalProductBasic {
	@Input() disable: boolean;
	@Input() product;
	@Input() saveAllow;
	@Input() response: Response;
	constructor(
		public activeModal: NgbActiveModal, 
		private config: Config, 
		private service: ProductService
	) {}

	allowSave(value = undefined) {
		if (value !== undefined) {
			if (value === 'quantity') {
				this.product.quantity.new = this.product.quantity.old;
			}
		}
		this.saveAllow = true;
	}

	fullEdition(target) {
		this.activeModal.close();
		let url = '#/products/' + target + '/' + this.product.id;
		window.location.href = url;
	}

	saveBasic() {
		this.disable = true;
		var curProduct = <any>{};
		['id', 'attribute', 'name'].forEach(el => curProduct[el] = this.product[el]);
		curProduct.quantity = this.product.quantity.old;
		curProduct.price = this.product.priceReal.new;
		curProduct.action = 'basic';
		curProduct.db = 'both';
		this.service.updateProduct(curProduct)
		.subscribe( data => {
			this.setResponse(data);
		});	
	}

	setResponse(data) {
		this.response = data;
		var outerThis = this;
		setTimeout(function() { 
			outerThis.response.success = undefined;
			outerThis.disable = false;
			outerThis.activeModal.close(true);
		}, this.config.timer);
	}

	updateAmount(price) {
		this.product.priceReal.new = parseFloat(price);
		this.product.priceReal.old = parseFloat(price);
		this.allowSave();
	}
}
