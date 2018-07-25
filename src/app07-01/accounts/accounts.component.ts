import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { MainData } from '../mainData';

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

	accountState: any[];
	accountType: any[];
	amount: number;
	automatic: boolean;
	currentState: number = -1;
	currentType: number = -1;
	dateFrom: any;
	dateTo: any;
	empty: boolean = false;
	list: Account[];
	loading: boolean;
	messageShow: boolean = false;
	messageType: string;
	messageValue:string;
	selected: number = 0;
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
		private loginService: LoginService,
		private mainData: MainData,
		private modalService: NgbModal,
		private parserFormatter: NgbDateParserFormatter,
		private router: Router,
		private service: AccountService
	) {
		this.accountState = this.mainData.accountState;
		//this.accountState.unshift(this.mainData.choose);
		this.accountType = this.mainData.accountType;
		//this.accountType.unshift(this.mainData.choose);
	}

 	ngOnInit() {
		//this.token = JSON.parse(localStorage.getItem('angular4Token'));
		this.token = localStorage.getItem('angular4Token');
		this.getAccounts();
	}
	 
	checkAccounts() {
		var data = [];
		if (this.currentState !== -1) {
			data.push( {
				key: 'state',
				value: this.currentState
			});
		}
		if (this.currentType !== -1) {
			data.push( {
				key: 'type',
				value: this.currentType
			});
		}
		if (this.dateFrom !== undefined) {
			data.push({ 
				key: 'dateFrom',
				value: this.parserFormatter.format(this.dateFrom)
			});
		}
		if (this.dateTo !== undefined) {
			data.push({ 
				key: 'dateTo',
				value: this.parserFormatter.format(this.dateTo)
			});
		}
		this.loading = true;
		this.service.getCustomAccounts(this.token, data)
		.subscribe( data => {
			this.handleData(data);
		});
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
		this.service.getAccounts(this.token)
		.subscribe( data => {
			this.handleData(data);
		});
	}

	handleData(data) {
		this.success = data.success;
		this.empty = Boolean(data.empty);
        this.loading = false;
		if (data.success) {
			if (!data.empty) {
				this.amount = data.amount;
				this.automatic = data.automatic;
				this.list = data.list.map(el => {
					el.amountFloat = parseFloat(el.amount);
					let curRow =  this.mainData.accountType.findIndex(secondEl => { return secondEl.id === el.type; });
					if (curRow !== -1) {
						el.typeName = this.mainData.accountType[curRow].name;
					}
					el.cashTimestamp = null;
					el.createTimestamp = null;
					if (el.cashTime !== undefined && el.cashTime !== null) {
						el.cashTimestamp = (new Date(el.cashTime).getTime()/1000);
					}
					if (el.createTime !== undefined && el.createTime !== null) {
						el.createTimestamp = (new Date(el.createTime).getTime()/1000);
					}
					let splitted = el.createTime.split(" ");
					el.createTime = splitted[0];
					return el;
				});
                let outerTotals = this.totals;
                this.list.forEach(el => {
                    if (el.closed === 1) {
                        if (el.type !== 3) {
                            outerTotals.amount = outerTotals.amount + el.amountFloat;
                        } else {
                            outerTotals.amountIt = outerTotals.amountIt + el.amountFloat;
                        }
                        this.toCount.forEach(secondEl => {
                            outerTotals[secondEl] = outerTotals[secondEl] + el[secondEl];
                        });
                    }
                });
                this.totals.tax = this.totals.amount * 0.03;
                this.totals.taxIt = this.totals.amountIt * 0.17;
				this.messageShow = false;
			}
		} else {
            this.messageShow = true;
            this.messageType = 'error';
            this.messageValue = data.reason;
            setTimeout(() => {
                this.router.navigate(['../login']);
            }, 3000);
        }
	}

	handleSelected(id) {
        if (id === -1) {
            this.selected = 0;
            this.displayMessage('error', this.mainData.accountClosed, 3000);
        } else {
            this.selected = this.selected !== id ? id : 0;
        }
	}

	logOut() {
		this.displayMessage('success', this.mainData.loggedOut, 3000, 'loginService', 'logOut');
	}

	open(action) {
        var data = {
            action: <string>action,
            obj:<Account>{},
            saveAllow: <boolean> false,
            state: <any> this.mainData.accountState,
            title: <string>'',
            type: <any> this.mainData.accountType,
            cashTime: <any>{},
            receiptTime: <any>{}
        };
        if (action === 'add') {
            data.obj.closed = -1;
            data.obj.type = -1;
            data.title = this.mainData.accountTitle[0];
            data.state.unshift(this.mainData.choose);
            data.type.unshift(this.mainData.choose);
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
            data.title = this.mainData.accountTitle[1];
        }
        console.log(data);
		const modalRef = this.modalService.open(AccountModal, { windowClass: 'current-modal' });
        modalRef.componentInstance.data = data;
	}

}
