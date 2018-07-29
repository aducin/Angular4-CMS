import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { TokenService } from '../service/token.service';
import { Config } from '../config';
import { GetTime } from '../shared/functions';

@Injectable()
export class AccountService {
  clear = new EventEmitter();
  dataEmitter = new EventEmitter<any>();
  headers: Headers;
  loading = new EventEmitter();
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

  getAccounts() {
    let url = this.config.url + 'accounts/' + this.token;
    let data = this.http.get(url)
    .map(res => this.handleAmounts(res.json()));
    this.dataEmitter.emit(data);
  }

  getCustomAccounts(params: {key: string, value: any}[]) {
    this.loading.emit();
    const url = this.config.url + 'accounts/' + this.token;
    const finalParams = params.reduce((obj, single) => {
      obj[single.key] = single.value;
      return obj;
    }, {});
    let data = this.http.get(url, {params: finalParams})
    .map(res => this.handleAmounts(res.json()))
    this.dataEmitter.emit(data);
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
      var result = this.http.post(url, data, this.headers);
    } else {
      var result = this.http.put(url, data, this.headers);
    }
    return result
  	.map(res => res.json());
	}

  setInitialState() {
    this.clear.emit();
    this.loading.emit();
    this.getAccounts();
  }
}
