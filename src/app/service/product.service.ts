import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';
import { Product, NameSearch } from '../model/product';
import { TokenService } from '../service/token.service';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ProductService {
	clear = new Subject();
	editionRefresh = new Subject();
	headers: Headers;
	interval: Observable<any>;
	listEmitter = new Subject<any>();
	loading = new Subject<string>();
	modifiedEmitter = new Subject<any>();
	modifiedSearch = new Subject();
	modify = new Subject();
	nameParams: NameSearch;
	newestOrders = new Subject<NameSearch>();
	path: string;
	printingEmitter = new Subject<any>();
	printingSearch = new Subject();
	singleProductEmitter = new Subject<any>();
	timer: number = 360000;
	token: string;

	constructor(
		private http: Http, 
		private config: Config, 
		private product: Product,
		private tokenService: TokenService
	) {
		this.interval = Observable.interval(this.timer);
		this.path = this.config.url + 'products/';
		this.token = this.tokenService.getToken();
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

	deleteAdditional(field, id) {
		let url = this.config.url + 'products/' + field + '/' + id + '/' + this.token;
		return this.http.delete(url)
		.map(res => res.json());
	}

	deleteNewest(db, id) {
		let url = this.config.url + 'orders/last/' + db + '/' + id + '/' + this.token;
		return this.http.get(url)
		.map(res => res.json());
	}

	emitListData(data) {
		this.listEmitter.next(data);
	}

	emitSingleData(data) {
		this.singleProductEmitter.next(data);
	}
/*
	getAdditional(field) {
		if (field === 'modified') {
			this.modifiedSearch.next();
		} else if (field === 'printing') {
			this.printingSearch.next();
		}
		let url = this.config.url + 'products/' + field + '/' + this.token ;
		let data = this.http.get(url).map(res => res.json());
		if (field === 'modified') {
			this.modifiedEmitter.next(data);
		} else {
			this.printingEmitter.next(data);
		}
	}
*/
	getBothLists(): Observable<any> {
		let urlFirst = this.config.url + 'categories';
		let urlSecond = this.config.url + 'manufacturers';
  		const categories = this.http.get(urlFirst).map(res => res.json());
  		const manufactorers = this.http.get(urlSecond).map(res => res.json());
	  	return Observable.forkJoin([categories, manufactorers]);
	}

	getEdition(id: number) {
		let url = this.path + id;
		return this.http.get(url)
		.map(res => res.json());
	}

	getIdSearch(id: number, origin: string) {
		if (origin === 'header') {
			delete(this.nameParams);
		}
		this.loading.next('id');
		let url = this.path + id + '?basic=true';
		return this.http.get(url)
		.map(res => {
			let obj = this.setPriceAndDiscount(res.json());
			obj.imgPath = this.config.serverPath + this.config.imageSuffix + obj.id + '-' + obj.image + '-thickbox.jpg';
			return obj;
		});
	}

	getHistory(id: number) {
		let url = this.path + id + '/history';
		return this.http.get(url)
		.map(res => res.json());
	}

	getModified() {
		let url = this.path + 'modified';
		return this.http.get(url)
		.map(res => res.json());
	}

	getNameSearch(obj: NameSearch) {
		this.nameParams = obj;
		this.loading.next('name');
		let category = obj.category;
		let manufactorer = obj.manufactorer;
		let name = obj.name;
		let url = this.config.url + 'products?search=' + name + '&category=' + category + '&manufacturer=' + manufactorer;
		return this.http.get(url)
		.map(res => res.json());
	}

	getNewestOrders() {
		let url = this.config.url + 'orders/last/' + this.token;
		return this.http.get(url)
		.map(res => res.json());
	}

	getPrinting() {
		let url = this.path + 'printing' + '/' + this.token;
		return this.http.get(url)
		.map(res => res.json());
	}

	getProduct() {
		return this.product;
	}

	setClear() {
		this.clear.next();
	}

	setEditionRefresh() {
		this.editionRefresh.next();
	}

	setModified() {
		this.modify.next();
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
