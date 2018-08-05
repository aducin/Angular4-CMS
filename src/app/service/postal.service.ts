import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Subject } from 'rxjs/Subject';

import { Config } from '../config';
import { GetHeaders } from '../shared/getHeaders';
import { TokenService } from '../service/token.service';

@Injectable()
export class PostalService {
	headers: Headers;
	dataEmitter = new Subject<any>();
	loading = new Subject();
	token: string;

	constructor(
		private http:Http, 
		private config: Config,
		private tokenService: TokenService
	) {
		this.headers = GetHeaders();
	}
	
	getList() {
		this.loading.next();
		const url = this.config.url + 'postal/' + this.tokenService.getToken();
		let data = this.http.get(url)
		.map(res => res.json());
		this.dataEmitter.next(data);
	}

	setPostal(data) {
  		const options = new RequestOptions({ headers: this.headers });
		const url = this.config.url + 'postal';
    	return this.http.put(url, data, this.headers)
    	.map(res => res.json());
	}
}
