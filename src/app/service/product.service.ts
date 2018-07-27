import { EventEmitter, Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';
import { Product, NameSearch } from '../model/product';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ProductService {
	clear = new EventEmitter();  
  	headers: Headers;
	idSearch = new EventEmitter<number>();  
	nameSearch = new EventEmitter<NameSearch>();  
  	toRefresh: boolean = false;
	toSave: boolean = false;

	constructor(private http: Http, private config: Config, private product: Product) {}

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

	getBothLists(): Observable<any> {
		let urlFirst = this.config.url + 'categories';
		let urlSecond = this.config.url + 'manufacturers';
  		const categories = this.http.get(urlFirst).map(res => res.json());
  		const manufactorers = this.http.get(urlSecond).map(res => res.json());
	  	return Observable.forkJoin([categories, manufactorers]);
	}

	getEdition(id) {
		let url = this.config.url + 'products/' + id;
		return this.http.get(url)
		.map(res => res.json());
	}

	getIdSearch(id: number) {
		let url = this.config.url + 'products/' + id + '?basic=true';
		return this.http.get(url)
		.map(res => res.json());
	}

	getHistory(id) {
		let url = this.config.url + 'products/' + id + '/history';
		return this.http.get(url)
		.map(res => res.json());
	}

	getNameSearch(name: string, category: number, manufactorer: number) {
		let url = this.config.url + 'products?search=' + name + '&category=' + category + '&manufacturer=' + manufactorer;
		return this.http.get(url)
		.map(res => res.json());
	}

	deleteNewest(db, id, token) {
		let url = this.config.url + 'orders/last/' + db + '/' + id + '/' + token;
		return this.http.get(url)
			.map(res => res.json());
	}

	getNewestOrders(token) {
		let url = this.config.url + 'orders/last/' + token;
		return this.http.get(url)
			.map(res => res.json());
	}

	deleteAdditional(field, id, token) {
		let url = this.config.url + 'products/' + field + '/' + id + '/' + token;
		return this.http.delete(url)
		.map(res => res.json());
	}

	getAdditional(field, token) {
		let url = this.config.url + 'products/' + field + '/' + token ;
		return this.http.get(url)
		.map(res => res.json());
	}

	getProduct() {
		return this.product;
	}

	getToRefresh() {
		return this.toRefresh;
	}

	getToSave() {
		return this.toSave;
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

	setProduct(obj) {
		this.product = obj;
		this.toSave = true;
	}

	setRefresh(bool) {
		this.toRefresh = bool;
		this.toSave = false;
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
