import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Subject } from 'rxjs/Subject';

import { TokenService } from '../service/token.service';
import { Config } from '../config';

@Injectable()
export class DeliveryService {
  clear = new Subject();
  dataEmitter = new Subject<any>();
  loading = new Subject();
  headers: Headers;
  params: {key: string, value: any}[];
  token: string;

  constructor(
    private http:Http, 
    private config: Config,
    private tokenService: TokenService
  ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.token = this.tokenService.getToken();
  }

  addFile(data) {
    let formData: FormData = new FormData();
		data.file.forEach((el) => {
			formData.append("file[]", el, el.name);
		});
		let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let url = this.config.url + 'delivery/' + data.documentNumber + '/' + data.id + '/' + data.token;
    return this.http.post(url, formData, options)
		.map(res => res.json());
  }

  getCustomDeliveries(params: {key: string, value: any}[]) {
    this.loading.next();
    const url = this.config.url + 'deliveries/' + this.token;
    const finalParams = params.reduce((obj, single) => {
      obj[single.key] = single.value;
      return obj;
    }, {});
    let data = this.http.get(url, {params: finalParams})
    .map(res => res.json());
    this.dataEmitter.next(data);
  }

  getDeliveries() {
    this.loading.next();
    const url = this.config.url + 'deliveries/' + this.token;
    let data = this.http.get(url)
    .map(res => res.json());
    this.dataEmitter.next(data);
  }

  setDeliveries(data, method, token) {
  	let options = new RequestOptions({ headers: this.headers });
    let url = this.config.url + 'delivery/' + token;
    let promise;
    if (method === 1) {
      promise = this.http.post(url, data, this.headers);
    } else {
      promise = this.http.put(url, data, this.headers);
    }
    return promise
  	.map(res => res.json());
  }

  setInitialState() {
    this.clear.next();
    this.getDeliveries();
  }

  setParams(data: {key: string, value: any}[]) {
    this.params = data;
    this.loading.next();
    this.getDeliveries();
  }
}
