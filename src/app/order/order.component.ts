import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { OrderService } from '../service/order.service';

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
  	constructor(
		  private cookieService: CookieService, 
		  private config: Config, 
		  private loginService: LoginService, 
		  private messageService: MessageService,
		  private route: ActivatedRoute, 
		  private router: Router, 
		  private service: OrderService,
	) { 
		this.actions = this.config.orderActions;
		this.panels = this.config.orders;
		this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
		this.service.dataEmitter
		.switchMap(observable => observable)
		.subscribe((response) => this.handleMailAction(response));
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

	handleMailAction(response) {
		let type = response.success ? 'success' : 'error';
		this.messageService.setMessage( Message(type, response.reason) );
	}

	setChildren() {
		if (this.route.firstChild === null) {
			this.children = false;
		} else {
			this.children = !Boolean(this.route.firstChild.snapshot.params.db === undefined && this.route.firstChild.snapshot.params.id === undefined);
		}
	}
}
