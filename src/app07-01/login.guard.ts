import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './service/login.service';

import { LoginComponent } from './login/login.component';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private cookieService: CookieService, private login: LoginComponent, private router: Router, private service: LoginService) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		var curToken = this.login.getAuthorised();
		console.log('this is token');
		console.log(curToken);
		if (!curToken) {
			console.log('redirecting to login');
			this.router.navigate(['/login']);
		} else {
			var validated = this.cookieService.get(curToken);
			console.log('this is short token');
			console.log(curToken);
			console.log(ActivatedRouteSnapshot);
			console.log(RouterStateSnapshot);
			if (!validated) {
				this.service.tokenCheck(curToken)
					.subscribe( data => {
						if (data.success) {
							localStorage.setItem('angular4User', JSON.stringify(data.user));
							this.cookieService.set( 'angular4Token', curToken, 604800 );
							this.cookieService.set( curToken, curToken, 720 );
							console.log('i was here!');
							console.log(data);
							//this.router.navigate(['/products']);
							return true;
						} else {
							return false;
						}
					});
			} else {
				return true;
			}
		}
	}
}
