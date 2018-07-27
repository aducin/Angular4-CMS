import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeliveryService {
  clear = new EventEmitter();
  headers: Headers;
  message: string;
  params: {
    status: string,
    type: string,
    dateFrom: string,
    dateTo: string
  };
  refresh = new EventEmitter();
  type: string;

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

  getDeliveries(token, params) {
    var url = this.config.url + 'deliveries/' + token;
    if (params !== null) {
      url = url + '?status=' + params.status + '&type=' + params.type + '&dateFrom=' + params.dateFrom + '&dateTo=' + params.dateTo;
    }
    return this.http.get(url)
    .map(res => res.json());
  }

  getMessage() {
    let response = {
      message: <string>this.message,
      type: <string>this.type,
    };
    return response;
  }

  setClear() {
    this.clear.emit();
  }

  setDeliveries(data, method, token) {
  	let options = new RequestOptions({ headers: this.headers });
    let url = this.config.url + 'delivery/' + token;
    if (method === 1) {
      var promise = this.http.post(url, data, this.headers);
    } else {
      var promise = this.http.put(url, data, this.headers);
    }
    return promise
  	.map(res => res.json());
  }
  
  setMessage(type, message) {
    this.type = type;
    this.message = message;
  }

  setParams(data: {
    status: string,
    type: string,
    dateFrom: string,
    dateTo: string
  }) {
    this.params = data;
    this.refresh.emit();
  }
}
