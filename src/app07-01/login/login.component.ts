import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	cookieToken: any = undefined;
	disabledButton: boolean = true;
	disabledFields: boolean = false;
	loggedIn: boolean = false;
	loggedError: boolean = false;
	login: string;
	password: string;
	remember: boolean = false;
	result: string;
  	constructor(private cookieService: CookieService, private router: Router, private service: LoginService) { }

  	ngOnInit() {
  		this.cookieToken = this.cookieService.get('angular4Token');
  		var curToken = localStorage.getItem('angular4Token');
  		if (!curToken && this.cookieToken !== undefined) {
  			curToken = this.cookieToken;
  		}
  		if (curToken) {
  			this.tokenCheck(curToken);
  		} else {
  			localStorage.removeItem('angular4User');
  		}
  	}

  	getAuthorised() {
		var curCookie = this.cookieService.get('angular4Token');
		var curAuth = localStorage.getItem('angular4Token');
		if (!curAuth && curCookie !== undefined) {
			curAuth = curCookie;
		}
		console.log('this is what i return');
		console.log(curAuth);
  		return curAuth;
  	}

  	handleData() {
  		this.disabledButton = Boolean(this.login === undefined || this.login.length < 4 || this.password === undefined || this.password.length < 4);
  	}

  	logIn() {
  		let params = {
			email: this.login,
			password: this.password,
			remember: this.remember,
		};
  		this.service.logIn(params)
  		.subscribe( data => {
  			this.result = data.reason;
  			this.loggedIn = data.success;
  			this.loggedError = !data.success;
  			if (data.success) {
  				setTimeout(() => { 
  					//localStorage.setItem('angular4Token', JSON.stringify(data.token));
					localStorage.setItem('angular4Token', data.token);
					this.cookieService.set( data.token, data.token, 720 );
  					localStorage.setItem('angular4User', JSON.stringify(data.user));
  					if (this.remember) {
  						this.cookieService.set( 'angular4Token', data.token, 604800 );
  						/*
  						let expires:Date = new Date();
						expires.setDate(expires.getDate()+7);
						let options: CookieOptionsArgs = <CookieOptionsArgs> {
				        	path: 'test',
				        	domain: 'www.test.de',
				        	expires: expires,
				        	//httpOnly: true,
				    	};
				    	console.log(options);
						this.cookieService.put('angular4Token', data.token, options);
						let check = this.getCookie('angular4Token');
						console.log(check);
						*/
  					}
  					this.router.navigate(['../products']);
  				}, 2000);
  			}
  		});
  	}

  	tokenCheck(token) {
  		this.service.tokenCheck(token) 
  		.subscribe( data => {
  			if (data.success) {
  				localStorage.setItem('angular4User', JSON.stringify(data.user));
  				if (this.cookieToken !== undefined) {
  					this.cookieService.set( 'angular4Token', token, 604800 );
  				}
				console.log('i was here');
				this.router.navigate(['../products']);
  			}
  		});	
  	}

}
