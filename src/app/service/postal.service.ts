import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';
import { TokenService } from '../service/token.service';

@Injectable()
export class PostalService {
	headers: Headers;
	dataEmitter = new EventEmitter<any>();
	loading = new EventEmitter();
	token: string;

	constructor(
		private http:Http, 
		private config: Config,
		private tokenService: TokenService
	) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.headers.append('Access-Control-Allow-Origin', '*');
	}
	
	getList() {
		this.loading.emit();
		const url = this.config.url + 'postal/' + this.tokenService.getToken();
		let data = this.http.get(url)
		.map(res => res.json());
		this.dataEmitter.emit(data);
	}

	setPostal(data) {
  		const options = new RequestOptions({ headers: this.headers });
		const url = this.config.url + 'postal';
    	return this.http.put(url, data, this.headers)
    	.map(res => res.json());
	}
}
