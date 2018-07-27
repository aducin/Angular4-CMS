import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { LoginService } from '../service/login.service';
import { OrderService } from '../service/order.service';
import { TokenService } from '../service/token.service';

import { Config } from '../config';

import { Customer } from '../model/customer';
import { OrderDetails } from '../model/orderDetails';
import { OrderRow } from '../model/orderRow';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

	actions: any;
	cardDetails: OrderRow[];
	children: boolean = false;
	chooseAction: boolean = true;
	customer: Customer;
	mail: any;
	messageShow: boolean = false;
	messageType: string;
	messageValue: string;
	orderDetails: OrderDetails;
	panels: any;
	searched: boolean = false;
	searchedId: number;
	self: string = 'orders';
	stopAction: boolean = true;
	stopOrder: boolean = true;
	token: string;
  	constructor(
		  private cookieService: CookieService, 
		  private config: Config, 
		  private loginService: LoginService, 
		  private route: ActivatedRoute, 
		  private router: Router, 
		  private service: OrderService,
		  private tokenService: TokenService
	) { 
		this.token = this.tokenService.getToken();
		this.actions = this.config.orderActions;
		this.panels = this.config.orders;
	}

  	ngOnInit() {}

	ngDoCheck() {
		if (this.route.firstChild === null) {
			this.children = false;
		} else {
			this.children = !Boolean(this.route.firstChild.snapshot.params.db === undefined && this.route.firstChild.snapshot.params.id === undefined);
		}
		if(this.service.failure) {
			this.service.setFailure(null);
			this.handleFailure(this.service.failure);
		} else if(this.service.request !== null) {
			this.mail = this.service.request;
			this.service.setRequest(null);
			this.sendMail();
		} else if(this.service.message !== null) {
			let message = this.service.message;
			this.service.setMessage(null);
			this.displayMessage(message.type, message.text, 3000);
		}
	}

	displayMessage(messageType, messageValue, timer, method = null, action = null) {
		this.messageShow = true;
		this.messageType = messageType;
		this.messageValue = messageValue;
		setTimeout(() => {
			this.messageShow = false;
			if (method && action) {
				this[method][action]();
			}
		}, timer);
	}
	
	handleFailure(data) {
		this.messageShow = true;
		this.messageType = 'error';
		this.messageValue = data.reason;
		setTimeout(() => {
			if (data.reason === "Token niepoprawny - u\u017cytkownik niezalogowany!") {
				this.router.navigate(['../login']);
			} else {
				this.messageShow = false;
			}
		}, 3000);
	}

  	logOut() {
  		this.displayMessage('success', this.config.loggedOut, 3000, 'loginService', 'logOut');
	}

	removeFirst(field) {
		let check = this[field].findIndex(el => { return el.id === -1; });
		if (check !== -1) {
			this[field].splice(check, 1);
		}
	}

	sendMail() {
		this.service.sendMail(this.mail)
		.subscribe( data => {
			if (data.success) {
				this.mail = null;
				this.displayMessage('success', data.reason, 3000);
			} else {
				this.handleFailure(data);
			}
		});
	}
}
