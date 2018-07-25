import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardsCheckEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './service/login.service';

import { LoginComponent } from './login/login.component';

@Injectable()
export class LoginGuard implements CanActivate {

	path: string;
	validated: boolean = false;
	constructor(private cookieService: CookieService, private login: LoginComponent, private router: Router, private service: LoginService) {
		router.events.forEach((event) => {
			if(event instanceof GuardsCheckEnd) {
				this.path = event.url;
			}
		  });
	}
	
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		var curToken = this.login.getAuthorised();
		//console.log('this is token');
		//console.log(curToken);
		if (!curToken) {
			console.log('redirecting to login');
			this.router.navigate(['/login']);
		} else {
			//var validated = this.cookieService.get(curToken);
			if (!this.validated) {
				this.service.tokenCheck(curToken)
					.subscribe( data => {
						console.log('i have been validated!');
						console.log(data);
						if (data.success) {
							localStorage.setItem('angular4User', JSON.stringify(data.user));
							//this.cookieService.set( 'angular4Token', curToken, 604800 );
							//this.cookieService.set( curToken, curToken, 720 );
							this.validated = true;
							if (this.path !== undefined) {
								let curPath = this.path;
								this.router.navigate([curPath]);
							}
							return true;
						} else {
							this.router.navigate(['/login']);
						}
					});
			} else {
				return true;
			}
		}
	}
}
