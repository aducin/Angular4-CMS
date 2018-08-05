import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { Config } from '../config';
import { GetHeaders } from '../shared/getHeaders';
import { TokenService } from '../service/token.service';

@Injectable()
export class OrderService {
	dataEmitter = new Subject<any>();
	headers: Headers;
	loading = new Subject();
	loadingFinished = new Subject();
	token: string;

	constructor(
		private http:Http, 
		private httpClient: HttpClient, 
		private config: Config,
		private tokenService: TokenService
	) {
		this.headers = GetHeaders();
		this.token = this.tokenService.getToken();
	}

	checkVouchers(id) {
		this.loading.next();
		let url = this.config.url + 'customer/old/' + id + '/vouchers/' + this.token;
		return this.http.get(url)
		.map(res => res.json());
	}

	evenOrder(db, id) {
		this.loading.next();
		let url = this.config.url + 'orders/' + db + '/' + id + '/even';
		let data = { token: this.token };
		return this.http.put(url, data, this.headers)
		.map(res => res.json());
	}
  
  	getOrder(db, id, additional = null) {
		this.loading.next();
		let url = this.config.url + 'orders/' + db + '/' + id + '/' + this.token;
		if (additional === 'basic') {
			url = url + '?basic=true';
		} else if (additional === 'discount') {
			url = url + '?action=discount';
		}
		return this.http.get(url)
		.map(res => res.json());
  	}

	sendMail(obj: {db: string, id: number, params: any, token: string}) {
		this.loading.next();
		let params = new HttpParams();
		let parameters = obj.params;
		let url = this.config.url + 'orders/' + obj.db + '/' + obj.id + '/mail/' + this.token;
		params = params.append("result", parameters.result);
		params = params.append("action", parameters.action);
		if (parameters.action === 'deliveryNumber') {
			params = params.append("deliveryNumber", parameters.deliveryNumber);
		} else if (parameters.action === 'voucher') {
			params = params.append("voucher", parameters.voucher);
		}
		let data = this.httpClient.get<any>(url, {params: params});
		this.loadingFinished.next();
		this.dataEmitter.next(data);
	}
}
