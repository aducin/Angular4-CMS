import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../service/product.service';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { MainData } from '../../mainData';
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
	manufactorer: Standard[];
	photos: boolean = false;
	saveDisabled: boolean = true;
	url: string;
	constructor(private service: ProductService, private route: ActivatedRoute, private product: Product, private router: Router, private mainData: MainData) { }

	ngOnInit() {
		this.id = this.route.snapshot.params.id;
		this.url = this.mainData.serverPath;
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
		this.active = this.mainData.active;
		this.condition = this.mainData.condition;
		this.getData();
	}

	ngDoCheck() {
		if (this.service.getToRefresh()) {
			this.service.setRefresh(false);
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
		this.service.getEdition(this.id)
  		.subscribe( data => {
  			if (data.success !== undefined && data.success === false) {
  				this.error = data.reason;
  			} else {
  				this.product = data;
  				var tagString: string = '';
  				var counter: number = 0;
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
		this.service.setProduct(this.product);
	}

	saveAllow() {
		this.saveDisabled = false;
	}

	showOrHide(field) {
		this[field] = !this[field];
	}
}
