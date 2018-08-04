import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { ProductService } from '../../service/product.service';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { Config } from '../../config';
import { Standard } from '../../model/standard';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {
	active: any[];
	categories: boolean = false;
	condition: any[];
	cursor: boolean = false;
	error: boolean = false;
	id: number;
	inputDisabled: boolean = true;
	loading: boolean = false;
	manufactorer: Standard[];
	photos: boolean = false;
	saveDisabled: boolean = true;
	url: string;
	constructor(
		private service: ProductService, 
		private route: ActivatedRoute, 
		private product: Product, 
		private router: Router, 
		private config: Config
	) { 
		this.service.editionRefresh.subscribe(() => this.getData());
	}

	ngOnInit() {
		this.id = this.route.snapshot.params.id;
		this.url = this.config.serverPath;
		let cachedManufactorers = JSON.parse(localStorage.getItem('manufactorers'));
		if (cachedManufactorers !== null && cachedManufactorers[0]) {
			this.manufactorer = cachedManufactorers;
		} else {
			this.service.getBothLists()
			.subscribe( data => {
				this.manufactorer = data[1];
				localStorage.setItem('manufactorers', JSON.stringify(this.manufactorer));
			});
		}
		this.active = this.config.active;
		this.condition = this.config.condition;
		this.getData();
	}

	ngAfterViewInit() {
		Observable.fromEvent(document.getElementById("saveEdition"), 'click') 
		//this.product
	}

	ngDoCheck() {
		if (this.id !== this.route.snapshot.params.id) {
			this.id = this.route.snapshot.params.id;
			this.getData();
		}
	}

	categoryHover() {
		this.cursor = true;
	}

	categoryUnhover() {
		this.cursor = false;
	}

	getData() {
		this.loading = true;
		this.service.getEdition(this.id)
  		.subscribe( data => {
  			if (data.success !== undefined && data.success === false) {
  				this.error = data.reason;
  			} else {
  				this.product = data;
  				let tagString: string = '';
  				let counter: number = 0;
  				this.product.categoryCount = 0;
  				data.categories.forEach(secondEl => {
  					if (secondEl.checked) {
  						this.product.categoryCount++;
  					}
  				});
  				this.product.imageCount = data.images.length;
  				this.product.productTags.forEach(secondEl => {
  					if (counter !== 0) {
  						tagString = tagString + ', ';
  					}
  					tagString = tagString + secondEl.name;
  					counter++;
  				});
  				this.product.quantityBoth = this.product.quantity.old;
  				this.product.tagString = tagString;
  				this.product.deleteImages = this.product.productUpdated = this.error = this.inputDisabled = false;
  				this.saveDisabled = true;
  			}
			this.loading = false;
  		});	
	}

	goBack() {
		this.router.navigate(['products'])
	}

	quantityHandle() {
		this.product.quantity = {
			new: this.product.quantityBoth,
			old: this.product.quantityBoth
		};
		this.saveDisabled = false;
	}

	save() {
		this.inputDisabled = true;
		this.service.setProductSave(this.product);
	}

	saveAllow() {
		this.saveDisabled = false;
	}

	showOrHide(field) {
		this[field] = !this[field];
	}
}
