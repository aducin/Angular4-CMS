import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Subject } from 'rxjs/Subject';

import { TokenService } from '../service/token.service';
import { Config } from '../config';
import { GetHeaders } from '../shared/getHeaders';

@Injectable()
export class DeliveryService {
  clear = new Subject();
  dataEmitter = new Subject<any>();
  loading = new Subject();
  headers: Headers;
  params: {key: string, value: any}[];
  refresh = new Subject();
  result = new Subject();
  token: string;

  constructor(
    private http:Http, 
    private config: Config,
    private tokenService: TokenService
  ) {
    this.headers = GetHeaders();
    this.token = this.tokenService.getToken();
  }

  addFile(data) {
    let formData: FormData = new FormData();
		data.file.forEach((el) => formData.append("file[]", el, el.name));
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
    return this.http.get(url, {params: finalParams})
    .map(res => res.json());
  }

  getDeliveries() {
    this.clear.next();
    this.loading.next();
    const url = this.config.url + 'deliveries/' + this.token;
    return this.http.get(url)
    .map(res => res.json());
  }

  removeNullFromNumbers(list: any[]) {
    return [...list].map(el => {
      this.config.deliveryNumbers.forEach(innerEl => el[innerEl] = el[innerEl] !== null ? el[innerEl] : 0);
      return el;
    });
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
    return promise.map(res => res.json());
  }

  setInitialState() { this.refresh.next() }

  setParams(data: {key: string, value: any}[]) {
    this.params = data;
    this.loading.next();
    this.getDeliveries();
  }

  setResult(response) { this.result.next(response) }

  setSuffix(amount: number) {
    let amountSuffix;
    if (amount === 1) {
      amountSuffix = 'wynik';
    } else if (amount > 1 && amount < 5) {
      amountSuffix = 'wyniki';
    } else {
      amountSuffix = 'wyników';
    }
    return amountSuffix;
  }
}
