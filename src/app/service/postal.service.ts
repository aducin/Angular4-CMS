import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';

@Injectable()
export class PostalService {
	
	headers: Headers;
	constructor(private http:Http, private config: Config) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.headers.append('Access-Control-Allow-Origin', '*');
	}
	
	getList(token) {
		let url = this.config.url + 'postal/' + token;
		return this.http.get(url)
		.map(res => res.json());
	}

	setPostal(data) {
  		let options = new RequestOptions({ headers: this.headers });
		let url = this.config.url + 'postal';
    	return this.http.put(url, data, this.headers)
    	.map(res => res.json());
	}
}