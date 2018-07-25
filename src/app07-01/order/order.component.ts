import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../service/login.service';
import { OrderService } from '../service/order.service';

import { MainData } from '../mainData';

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
	actionId: number;
	cardDetails: OrderRow[];
	children: boolean = false;
	chooseAction: boolean = true;
	curAction: number = -1;
	curPanel: number = -1;
	customer: Customer;
	mail: any;
	messageShow: boolean = false;
	messageType: string;
	messageValue: string;
	orderDetails: OrderDetails;
	orderId: number;
	panels: any;
	searched: boolean = false;
	searchedId: number;
	stopAction: boolean = true;
	stopOrder: boolean = true;
	token: string;
  	constructor(private mainData: MainData, private loginService: LoginService, private route: ActivatedRoute, private router: Router, private service: OrderService) { 
		this.actions = this.mainData.orderActions;
		this.panels = this.mainData.orders;
	}

  	ngOnInit() {
		//this.token = JSON.parse(localStorage.getItem('angular4Token'));
		this.token = localStorage.getItem('angular4Token');
	}

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
			if (method !== null && action !== null) {
				this[method][action]();
			}
		}, timer);
	}
	  
	handleButton(origin) {
		if (origin === 'order') {
			var curNumber = isNaN(this.orderId);
			this.stopOrder = this.curPanel === -1 || curNumber || this.orderId < 1;
		} else {
			var curNumber = isNaN(this.actionId);
			this.stopAction = this.curAction === -1 || curNumber || this.actionId < 1;
		}
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
  		setTimeout(() => { 
			this.loginService.logOut();
		}, 3000);
	}

	redirect(target) {
		if (target === 'order') {
			delete(this.actionId);
			let check = this.panels.findIndex(el => { return el.id === this.curPanel });
			if (check !== -1) {
				let curDb = this.panels[check].value;
				this.router.navigate(['../orders/' + curDb + '/' + this.orderId]);
			}
		} else {
			delete(this.orderId);
			if (this.curAction === 0) {
				this.router.navigate(['../orders/old/' + this.actionId + '/voucher']);
			} else if (this.curAction === 1) {
				this.router.navigate(['../orders/old/' + this.actionId + '/discount']);
			} else {
				let curDb = this.curAction === 2 ? 'new' : 'old';
				this.router.navigate(['../orders/' + curDb + '/' + this.actionId + '/mail']);
			}
		}
	}

	removeFirst(field) {
		let check = this[field].findIndex(el => { return el.id === -1; });
		if (check !== -1) {
			this[field].splice(check, 1);
		}
	}

	searchAction() {
		console.log(this.curAction);
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
