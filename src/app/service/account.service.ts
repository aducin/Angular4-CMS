import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Config } from '../config';
import { GetTime } from '../shared/functions';

@Injectable()
export class AccountService {

  headers: Headers;
  constructor(private http:Http, private config: Config) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  handleAmounts(obj) {
    let newObj = {...obj, list: []};
    newObj.totals = {
        amount: 0,
        amountIt: 0,
        tax: 0,
        taxIt: 0
    }
    if (obj.list) {
      newObj.list = obj.list.map((el) => {
        el.amountFloat = parseFloat(el.amount);
        if (el.closed) {
          if (el.type === 3) {
            newObj.totals.amountIt += el.amountFloat;
          } else if (el.type !== 5) {
            newObj.totals.amount += el.amountFloat;
          } else {
            newObj.totals.amount -= el.amountFloat;
          }
        }
        this.handleDateObj(el);
        return el;
      });
    }
    newObj.totals.tax = newObj.totals.amount * 0.03;
    newObj.totals.taxIt = newObj.totals.amountIt * 0.17;
    return newObj;
  }

  handleDateObj(el) {
    el.cashTimestamp = null;
		el.createTimestamp = null;
		if (el.cashTime) {
			el.cashTimestamp = GetTime(el.cashTime);
		}
		if (el.receiptTime) {
			el.receiptTimestamp = GetTime(el.receiptTime);
		}
		let splitted = el.createTime.split(" ");
		el.createTime = splitted[0];
    el.createTimestamp = GetTime(el.createTime);
  }

  getAccounts(token) {
    let url = this.config.url + 'accounts/' + token;
    return this.http.get(url)
    .map(res => {
      let response = this.handleAmounts(res.json());
      return response;
    });
  }

  getCustomAccounts(token, params) {
    const url = this.config.url + 'accounts/' + token;
    const finalParams = params.reduce((obj, single) => {
      obj[single.key] = single.value;
      return obj;
    }, {});
    return this.http.get(url, {params: finalParams})
    .map(res => {
      let response = this.handleAmounts(res.json());
      return response;
    });
  }

  modifyAccount(data) {
  	let options = new RequestOptions({ headers: this.headers });
		const url = this.config.url + 'accounts';
    return this.http.put(url, data, this.headers)
    .map(res => res.json());
	}

  setAccount(data, method, token) {
  	let options = new RequestOptions({ headers: this.headers });
    const url = this.config.url + 'accounts/' + token;
    if (method === 1) {
      var promise = this.http.post(url, data, this.headers);
    } else {
      var promise = this.http.put(url, data, this.headers);
    }
    return promise
  	.map(res => res.json());
	}

}
