import { Injectable } from '@angular/core';

import { Category } from './category';
import { Standard } from './standard';

import { ProductService } from '../service/product.service';

import { Config } from '../config';

@Injectable()
export class Lists {
    category: Category[];
    manufactorer: Standard[];

    constructor(
        private config: Config, 
        private service: ProductService
    ) {}

    getLists() {
		let cachedCategories = JSON.parse(localStorage.getItem('categories'));
		let cachedManufactorers = JSON.parse(localStorage.getItem('manufactorers'));
		if (cachedCategories && cachedCategories[0] && cachedManufactorers && cachedManufactorers[0]) {
			this.category = cachedCategories;
			this.manufactorer = cachedManufactorers;
		} else {
			this.service.getBothLists()
			.subscribe( data => {
				this.category = data[0];
				this.category.unshift(this.config.chooseCategory);
				this.manufactorer = data[1];
				this.manufactorer.unshift(this.config.chooseManufactorer);
				localStorage.setItem('categories', JSON.stringify(this.category));
				localStorage.setItem('manufactorers', JSON.stringify(this.manufactorer));
			});
		}
		this.service.lists.next({ categories: this.category, manufactorers: this.manufactorer});
	}
}
