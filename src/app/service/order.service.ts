import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient } from '@angular/common/http';

import { Config } from '../config';
import { TokenService } from '../service/token.service';

@Injectable()
export class OrderService {
  	headers: Headers;
	request = new EventEmitter<{db: string, id: number, params: any, token: string}>();
	token: string;

	constructor(
		private http:Http, 
		private httpClient: HttpClient, 
		private config: Config,
		private tokenService: TokenService
	) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.headers.append('Access-Control-Allow-Origin', '*');
		this.token = this.tokenService.getToken();
	}

	checkVouchers(id, token) {
		let url = this.config.url + 'customer/old/' + id + '/vouchers/' + token;
		return this.http.get(url)
			.map(res => res.json());
	}

	evenOrder(db, id, token) {
		let url = this.config.url + 'orders/' + db + '/' + id + '/even';
		let data = { tokn: token };
		return this.http.put(url, data, this.headers)
			.map(res => res.json());
	}
  
  	getOrder(db, id, token, additional = null) {
		var url = this.config.url + 'orders/' + db + '/' + id + '/' + token;
		if (additional === 'basic') {
			url = url + '?basic=true';
		} else if (additional === 'discount') {
			url = url + '?action=discount';
		}
		return this.http.get(url)
		.map(res => res.json());
  	}

	setRequest(obj: {db: string, id: number, params: any, token: string}) {
		this.request.emit(obj);
	}

	sendMail(data) {
		var params = new HttpParams();
		var parameters = data.params;
		var url = this.config.url + 'orders/' + data.db + '/' + data.id + '/mail/' + data.token;
		params = params.append("result", parameters.result);
		params = params.append("action", parameters.action);
		if (parameters.action === 'deliveryNumber') {
			params = params.append("deliveryNumber", parameters.deliveryNumber);
		} else if (parameters.action === 'voucher') {
			params = params.append("voucher", parameters.voucher);
		}
		return this.httpClient.get<any>(url, {params: params});
	}
}
