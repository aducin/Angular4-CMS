import { Component } from '@angular/core';

import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private token: TokenService ) {
		this.token.setToken(); 
	}
}
