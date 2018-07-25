import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";

import { MainData } from '../mainData';
import { Product } from '../model/product';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ProductService {

  	headers: Headers;
  	toRefresh: boolean = false;
  	toSave: boolean = false;
	constructor(private http: Http, private mainData: MainData, private product: Product) {}

	getBothLists(): Observable<any> {
		let urlFirst = this.mainData.url + 'categories';
		let urlSecond = this.mainData.url + 'manufacturers';
  		const categories = this.http.get(urlFirst).map(res => res.json());
  		const manufactorers = this.http.get(urlSecond).map(res => res.json());
	  	return Observable.forkJoin([categories, manufactorers]);
	}

	getEdition(id) {
		let url = this.mainData.url + 'products/' + id;
		return this.http.get(url)
		.map(res => res.json());
	}

	getIdSearch(id: number) {
		let url = this.mainData.url + 'products/' + id + '?basic=true';
		return this.http.get(url)
		.map(res => res.json());
	}

	getHistory(id) {
		let url = this.mainData.url + 'products/' + id + '/history';
		return this.http.get(url)
		.map(res => res.json());
	}

	getNameSearch(name: string, category: number, manufactorer: number) {
		let url = this.mainData.url + 'products?search=' + name + '&category=' + category + '&manufacturer=' + manufactorer;
		return this.http.get(url)
		.map(res => res.json());
	}

	deleteModified(id) {
		let url = this.mainData.url + 'products/modified/' + id;
		return this.http.delete(url)
		.map(res => res.json());
	}

	getModified() {
		let url = this.mainData.url + 'products/modified';
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
		//this.headers.append('Content-Type', 'application/json');
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  		this.headers.append('Access-Control-Allow-Origin', '*');
  		let options = new RequestOptions({ headers: this.headers });
		let url = this.mainData.url + 'products/' + data.id + '/' + data.attribute.new + '/' + data.attribute.old;
    	return this.http.put(url, data, this.headers)
    	.map(res => res.json());
	}
}
