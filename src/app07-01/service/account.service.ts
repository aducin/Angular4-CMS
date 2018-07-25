import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { MainData } from '../mainData';

@Injectable()
export class AccountService {

  headers: Headers;
  constructor(private http:Http, private mainData: MainData) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getAccounts(token) {
    let url = this.mainData.url + 'accounts/' + token;
    return this.http.get(url)
    .map(res => res.json());
  }

  getCustomAccounts(token, params) {
    var url = this.mainData.url + 'accounts/' + token;
    var counter = 0;
    params.forEach(el => {
      if (counter === 0) {
        url = url + '?' + el.key + '=' + el.value;
      } else {
        url = url + '&' + el.key + '=' + el.value;
      }
      counter++;
    });
    return this.http.get(url)
    .map(res => res.json());
  }

  modifyAccount(data) {
  	let options = new RequestOptions({ headers: this.headers });
		let url = this.mainData.url + 'accounts';
    return this.http.put(url, data, this.headers)
    .map(res => res.json());
	}

  setAccount(data) {
  	let options = new RequestOptions({ headers: this.headers });
		let url = this.mainData.url + 'accounts';
    return this.http.put(url, data, this.headers)
  	.map(res => res.json());
	}

}
