import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class TokenService {
    token: string = '';

	constructor( private cookieService: CookieService ) {}

    clearToken() {
		this.token = '';
	}
	
	getToken() {
        return this.token;
    }

	setNewToken(value: string) {
		this.token = value;	
	}

	setToken() {
		let token = localStorage.getItem('angular4Token');
		if (!token) {
			token = this.cookieService.get('angular4Token');
		}
		if (token) {
			this.token = token;
		}
	}
};
