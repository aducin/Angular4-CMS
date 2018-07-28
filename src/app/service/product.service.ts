import { EventEmitter, Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';
import { Product, NameSearch } from '../model/product';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ProductService {
	clear = new EventEmitter();
	editionRefresh = new EventEmitter();
	headers: Headers;
	idSearch = new EventEmitter<number>();
	interval: Observable<any>;
	modyfiedRefresh = new EventEmitter();
	nameSearch = new EventEmitter<NameSearch>();
	newestOrders = new EventEmitter<NameSearch>();
	save = new EventEmitter();
	timer: number = 360000;

	constructor(
		private http: Http, 
		private config: Config, 
		private product: Product
	) {
		this.interval = Observable.interval(this.timer);
	}

	addPrinting(data) {
		let formData: FormData = new FormData();
		data.file.forEach((el) => {
			formData.append("file[]", el, el.name);
		});
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers });
		let url = this.config.url + 'products/printing/' + data.token;
		delete(data.file);
		delete(data.token);
		options.params = data;
    	return this.http.post(url, formData, options)
		.map(res => res.json());
	}

	deleteAdditional(field, id, token) {
		let url = this.config.url + 'products/' + field + '/' + id + '/' + token;
		return this.http.delete(url)
		.map(res => res.json());
	}

	deleteNewest(db, id, token) {
		let url = this.config.url + 'orders/last/' + db + '/' + id + '/' + token;
		return this.http.get(url)
		.map(res => res.json());
	}

	getAdditional(field, token) {
		let url = this.config.url + 'products/' + field + '/' + token ;
		return this.http.get(url)
		.map(res => res.json());
	}

	getBothLists(): Observable<any> {
		let urlFirst = this.config.url + 'categories';
		let urlSecond = this.config.url + 'manufacturers';
  		const categories = this.http.get(urlFirst).map(res => res.json());
  		const manufactorers = this.http.get(urlSecond).map(res => res.json());
	  	return Observable.forkJoin([categories, manufactorers]);
	}

	getEdition(id: number) {
		let url = this.config.url + 'products/' + id;
		return this.http.get(url)
		.map(res => res.json());
	}

	getIdSearch(id: number) {
		let url = this.config.url + 'products/' + id + '?basic=true';
		return this.http.get(url)
		.map(res => {
			let obj = this.setPriceAndDiscount(res.json());
			obj.imgPath = this.config.serverPath + this.config.imageSuffix + obj.id + '-' + obj.image + '-thickbox.jpg';
			return obj;
		});
	}

	getHistory(id: number) {
		let url = this.config.url + 'products/' + id + '/history';
		return this.http.get(url)
		.map(res => res.json());
	}

	getNameSearch(name: string, category: number, manufactorer: number) {
		let url = this.config.url + 'products?search=' + name + '&category=' + category + '&manufacturer=' + manufactorer;
		return this.http.get(url)
		.map(res => res.json());
	}

	getNewestOrders(token: string) {
		let url = this.config.url + 'orders/last/' + token;
		return this.http.get(url)
		.map(res => res.json());
	}

	getProduct() {
		return this.product;
	}

	setClear() {
		this.clear.emit();
	}

	setIdSearch(id: number) {
    	this.idSearch.emit(id);
  	}

	setNameSearch(obj: NameSearch) {
		this.nameSearch.emit(obj);
	}

	setPriceAndDiscount(obj) {
		obj.priceBlock = obj.discount.new || !obj.discount.old;
		obj.priceReal = {
			new: obj.price.new,
			old: obj.price.old,
		};
		if (obj.discount.new || !obj.discount.old) {
			var discountValue = 0;
			if (obj.discount.new.reduction !== undefined) {
				if (obj.discount.new.reductionType === 'amount') {
					obj.priceReal.new = Math.round((obj.price.new - obj.discount.new.reduction) * 100) / 100;
				} else if (obj.discount.new.reductionType === 'percentage') {
					let curAmount = obj.price.new * (obj.discount.new.reduction / 100);
					obj.priceReal.new = Math.round((obj.price.new - curAmount) * 100) / 100;
				}
				discountValue++;
			}
			if (obj.discount.old.reduction !== undefined) {
				if (obj.discount.old.reductionType === 'amount') {
					obj.priceReal.old = Math.round((obj.price.old - obj.discount.old.reduction) * 100) / 100;
				} else if (obj.discount.old.reductionType === 'percentage') {
					let curAmount = obj.price.old * (obj.discount.old.reduction / 100);
					obj.priceReal.old = Math.round((obj.price.old - curAmount) * 100) / 100;
				}
				discountValue++;
			}
			obj.discountValue = discountValue;
		}
		return obj;
	}

	setProductSave(obj) {
		this.product = obj;
		this.save.emit();
	}

	setRefresh() {
		this.editionRefresh.emit();
		this.modyfiedRefresh.emit();
	}

	updateProduct(data) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  		this.headers.append('Access-Control-Allow-Origin', '*');
  		let options = new RequestOptions({ headers: this.headers });
		let url = this.config.url + 'products/' + data.id + '/' + data.attribute.new + '/' + data.attribute.old;
    	return this.http.put(url, data, this.headers)
    	.map(res => res.json());
	}
}
