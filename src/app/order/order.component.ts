import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { OrderService } from '../service/order.service';
import { TokenService } from '../service/token.service';

import { Config } from '../config';
import { Customer } from '../model/customer';
import { Message } from '../shared/functions';
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
		  private messageService: MessageService,
		  private route: ActivatedRoute, 
		  private router: Router, 
		  private service: OrderService,
		  private tokenService: TokenService
	) { 
		this.actions = this.config.orderActions;
		this.panels = this.config.orders;
		this.token = this.tokenService.getToken();
		this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
		this.service.request.subscribe((data) => {
			this.mail = data;
			this.sendMail();
		});
	}

  	ngOnInit() {}

	ngDoCheck() { this.setChildren() }

  	logOut() {
		this.messageService.setMessage( Message('success', this.config.loggedOut, 'logOut', 'loginService') );
	}

	messageDisplay(data) {
		this.messageShow = data.display;
		this.messageType = data.type;
  		this.messageValue = data.value;
	}

	postMessageAction(data) {
		if (this[data.object]) {
			if (data.action === 'navigate') {
				this.router.navigate(['../login']);
			} else {
				this[data.object][data.action]();
			}
		}
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
				this.messageService.setMessage( Message('success', data.reason) );
			} else {
				this.messageService.setMessage( Message('error', data.reason) );
			}
		});
	}

	setChildren() {
		if (this.route.firstChild === null) {
			this.children = false;
		} else {
			this.children = !Boolean(this.route.firstChild.snapshot.params.db === undefined && this.route.firstChild.snapshot.params.id === undefined);
		}
	}
}
