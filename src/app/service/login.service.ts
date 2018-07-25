import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Config } from '../config';

@Injectable()
export class LoginService {

	headers: Headers;
  	constructor(
		  private cookieService: CookieService, 
		  private http: Http, 
		  private config: Config, 
		  private router: Router
	) {}

  	logIn(data) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  		this.headers.append('Access-Control-Allow-Origin', '*');
  		let options = new RequestOptions({ headers: this.headers });
  		let url = this.config.url + 'login';
		return this.http.post(url, data, this.headers)
    	.map(res => res.json());
	}

	logOut() {
		this.cookieService.delete('angular4Token');
		localStorage.removeItem('angular4Token');
		localStorage.removeItem('angular4User');
		this.router.navigate(['../login']);
	}

	tokenCheck(token) {
		let url = this.config.url + 'login?token=' + token;
		return this.http.get(url)
    	.map(res => res.json());
	}
}
