import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { Subject } from 'rxjs/Subject';

import { TokenService } from '../service/token.service';
import { Config } from '../config';
import { GetHeaders } from '../shared/getHeaders';
import { GetTime } from '../shared/functions';

@Injectable()
export class AccountService {
  clear = new Subject();
  headers: Headers;
  loading = new Subject();
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

  getAccounts() {
    this.clear.next();
    this.loading.next();
    let url = this.config.url + 'accounts/' + this.token;
    return this.http.get(url)
    .map(res => this.handleAmounts(res.json()));
  }

  getCustomAccounts(params: {key: string, value: any}[]) {
    this.loading.next();
    const url = this.config.url + 'accounts/' + this.token;
    const finalParams = params.reduce((obj, single) => {
      obj[single.key] = single.value;
      return obj;
    }, {});
    return this.http.get(url, {params: finalParams})
    .map(res => this.handleAmounts(res.json()))
  }

  handleAmounts(obj) {
    let totals = { amount: 0, amountIt: 0, tax: 0, taxIt: 0 };
    let newObj = { ...obj, list: [], totals };
    if (obj.list) {
      newObj.list = obj.list.map((el) => {
        el.amountFloat = parseFloat(el.amount);
        if (el.closed) {
          if (el.type === this.config.typeIt) {
            newObj.totals.amountIt += el.amountFloat;
          } else if (el.type !== this.config.typeReturn) {
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

  modifyAccount(data) {
  	let options = new RequestOptions({ headers: this.headers });
		const url = this.config.url + 'accounts';
    return this.http.put(url, data, this.headers)
    .map(res => res.json());
	}

  removeNullFromNumbers(list: any[]) {
    return [...list].map(el => {
      this.config.accountNumbers.forEach(innerEl => el[innerEl] = el[innerEl] !== null ? el[innerEl] : 0);
      return el;
    });
  }

  setAccount(data, method, token) {
    let result;
  	let options = new RequestOptions({ headers: this.headers });
    const url = this.config.url + 'accounts/' + token;
    if (method === 1) {
      result = this.http.post(url, data, this.headers);
    } else {
      result = this.http.put(url, data, this.headers);
    }
    return result
  	.map(res => res.json());
	}

  setResult(result) { this.result.next(result)}
}
