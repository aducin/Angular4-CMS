import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { Config } from '../config';

import { Account } from '../model/account';
import { AccountSummary } from '../model/accountSummary';
import { AccountListComponent } from './account-list/account-list.component';

import { AccountModal } from '../modal/accountModal.component';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css'],
	encapsulation: ViewEncapsulation.None,
	styles: [`
		.current-modal {
		position: fixed;
		top: 5%;
		}
		.modal-content {
		width: 120%;
		}`
  	]
})
export class AccountsComponent implements OnInit {
	amount: number;
	automatic: boolean;accountState
	empty: boolean = false;
	list: Account[];
	loading: boolean;
	messageShow: boolean = false;
	messageType: string;
	messageValue:string;
	refresh: boolean = false;
	selected: number = 0;
	self: string = 'accounts';
	success: boolean;
    toCount: string[] = ['locs', 'coach', 'element', 'accessories', 'book', 'car'];
	token: string;
    totals = {
        amount: <number> 0,
        amountIt: <number> 0,
        locs: <number> 0,
        coach: <number> 0,
        element: <number> 0,
        accessories: <number> 0,
        book: <number> 0,
        car: <number> 0,
        tax: <number> 0,
        taxIt: <number> 0
    };
    constructor(
		private cookieService: CookieService,
		private loginService: LoginService,
		private config: Config,
		private modalService: NgbModal,
		private router: Router,
		private service: AccountService
	) {}

 	ngOnInit() {
		this.token = localStorage.getItem('angular4Token');
		if (this.token === undefined || this.token === null) {
			this.token = this.cookieService.get('angular4Token');
		}
		this.getAccounts();
	}
	 
	checkAccounts(data) {
		this.loading = true;
		this.service.getCustomAccounts(this.token, data)
		.subscribe( data => {
			this.handleData(data);
		});
	}

	checkEmpty(obj) {
		return obj.findIndex((el) => { return el.id === -1; });
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

	getAccounts() {
		this.loading = true;
		this.refresh = false;
		this.service.getAccounts(this.token)
		.subscribe( data => {
			this.handleData(data);
		});
	}

	handleData(data) {
		this.success = data.success;
        this.loading = false;
		if (data.success) {
			this.empty = Boolean(data.empty);
			if (!data.empty) {
				this.config.accountList.forEach( el => this[el] = data[el] );
			}
		} else {
            this.messageShow = true;
            this.messageType = 'error';
            this.messageValue = data.reason;
            setTimeout(() => {
                this.router.navigate(['../login']);
            }, this.config.timer);
        }
	}

	handleSelected(id) {
        if (id === -1) {
            this.selected = 0;
            this.displayMessage('error', this.config.accountClosed, 3000);
        } else {
            this.selected = this.selected !== id ? id : 0;
        }
	}

	logOut() {
		this.displayMessage('success', this.config.loggedOut, 3000, 'loginService', 'logOut');
	}

	open(action) {
        var data = {
            action: <string>action,
            obj:<Account>{},
            saveAllow: <boolean> false,
            state: <any> this.config.accountState,
			title: <string>'',
			token: <string>this.token,
            type: <any> this.config.accountType,
            cashTime: <any>{},
            receiptTime: <any>{}
        };
        if (action === 'add') {
            data.obj.closed = -1;
            data.obj.type = -1;
			data.title = this.config.accountTitle[0];
			var stateCheck = this.checkEmpty(data.state);
			if (stateCheck === -1) {
				data.state.unshift(this.config.choose);	
			}
			var typeCheck = this.checkEmpty(data.type);
            if (typeCheck === -1) {
				data.type.unshift(this.config.choose);
			}
        } else {
            var check = this.list.findIndex(el => {
                return el.id === this.selected;
            });
            if (check !== -1) {
                data.obj = this.list[check];
                if (data.obj.cashTime !== undefined) {
                    let splitted = data.obj.cashTime.split('-');
                    data.cashTime = {
                        year: parseInt(splitted[0]),
                        month: parseInt(splitted[1]),
                        day: parseInt(splitted[2])
                    };
                }
                if (data.obj.receiptTime !== undefined) {
                    let splitted = data.obj.receiptTime.split('-');
                    data.receiptTime = {
                        year: parseInt(splitted[0]),
                        month: parseInt(splitted[1]),
                        day: parseInt(splitted[2])
                    };
                }
            }
            data.title = this.config.accountTitle[1];
        }
		const modalRef = this.modalService.open(AccountModal, { windowClass: 'current-modal' });
		modalRef.componentInstance.data = data;
		modalRef.result.then((refresh) => {
			if (refresh) {
				this.refresh = true;
				this.getAccounts();
			}
	  	}, (reason) => {
	  	});
	}
}
