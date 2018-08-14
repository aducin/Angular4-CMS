import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { LoginService } from '../service/login.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	cookieToken: any = undefined;
	disabledFields: boolean = false;
	loggedIn: boolean = false;
	loggedError: boolean = false;
	login: string;
	password: string;
	remember: boolean = false;
	result: string;
	timer: number = 2000;
	token: string;
  	constructor(
		private cookieService: CookieService, 
		private router: Router, 
		private service: LoginService,
		private tokenService: TokenService
	) { 
		this.token = this.tokenService.getToken();
	}

  	ngOnInit() {
  		if (this.token) {
  			this.tokenCheck(this.token);
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
  		return curAuth;
  	}

  	logIn() {
		let params = {
			email: this.login,
			password: this.password,
			remember: this.remember
		};
		this.disabledFields = true;
		this.service.logIn(params)
		.subscribe( data => {
			this.result = data.reason;
			this.loggedIn = data.success;
			this.loggedError = !data.success;
  			if (data.success) {
				setTimeout(() => { 
					localStorage.setItem('angular4Token', data.token);
					this.cookieService.set( data.token, data.token, 720 );
					this.tokenService.setNewToken(data.token);
					localStorage.setItem('angular4User', JSON.stringify(data.user));
					if (this.remember) {
						this.cookieService.set( 'angular4Token', data.token, 604800 );
					}
					this.router.navigate(['../products']);
				}, this.timer);
  			} else {
				this.removeMessage();
			}
  		});
  	}

	removeMessage() {
		setTimeout(() => { 
			this.loggedError = false;
			this.disabledFields = false;
		}, this.timer);
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
