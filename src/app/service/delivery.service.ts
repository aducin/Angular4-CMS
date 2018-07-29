import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeliveryService {
  clear = new EventEmitter();
  getData = new EventEmitter<boolean>();
  headers: Headers;
  params: {key: string, value: any}[];

  constructor(private http:Http, private config: Config) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Origin', '*');
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

  getCustomDeliveries(token, params) {
    const url = this.config.url + 'deliveries/' + token;
    const finalParams = params.reduce((obj, single) => {
      obj[single.key] = single.value;
      return obj;
    }, {});
    return this.http.get(url, {params: finalParams})
    .map(res => res.json());
  }

  getDeliveries(token) {
    const url = this.config.url + 'deliveries/' + token;
    let data = this.http.get(url)
    .map(res => res.json());
    return data;
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
    this.clear.emit();
    this.getData.emit(true);
  }

  setParams(data: {key: string, value: any}[]) {
    this.params = data;
    this.getData.emit(false);
  }
}
