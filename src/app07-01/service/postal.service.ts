import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { MainData } from '../mainData';

@Injectable()
export class PostalService {
	
	headers: Headers;
	constructor(private http:Http, private mainData: MainData) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.headers.append('Access-Control-Allow-Origin', '*');
	}
	
	getList(token) {
		let url = this.mainData.url + 'postal/' + token;
		return this.http.get(url)
		.map(res => res.json());
	}

	setPostal(data) {
  		let options = new RequestOptions({ headers: this.headers });
		let url = this.mainData.url + 'postal';
    	return this.http.put(url, data, this.headers)
    	.map(res => res.json());
	}
}