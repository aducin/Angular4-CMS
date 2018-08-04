import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
	
import { Config } from '../../config';
import { CheckEmpty } from '../../shared/functions';
import { AccountService } from '../../service/account.service';

@Component({
	selector: 'account-header',
	templateUrl: './account-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AccountHeaderComponent implements OnInit {
    accountState: any[];
	accountType: any[];
    currentState: number = -1;
	currentType: number = -1;
    dateFrom: any;
	dateTo: any;
	subscription: any;

    @Input() loading: boolean;
    @Input() refresh: boolean;
    @Output() openModal = new EventEmitter<string>();
    constructor(
        private config: Config,
        private parserFormatter: NgbDateParserFormatter,
		private service: AccountService
    ) {
        this.setLists();
		this.service.clear.subscribe(() => this.clearHeader());
    }

	ngOnInit() {
		let hook = document.getElementsByClassName("checkAccounts");
		let changeStream = Observable.fromEvent(hook, 'change');
		this.subscription = changeStream.subscribe(e => this.checkAccounts());
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

    checkAccounts() {
		let data = this.config.accountHeaders.reduce((array, single) => {
			let currentName = single.fullName;
			if (this[currentName] !== undefined && this[currentName] !== -1) {
				let value = typeof(this[currentName]) === 'number' ? this[currentName] : this.parserFormatter.format(this[currentName]);
				array.push({ key: single.name, value });
			}
			return array;
		}, []);
		this.service.getCustomAccounts(data);
	}

	clearHeader() {
		this.setEmpties();
		this.currentState = -1;
		this.currentType = -1;
		this.dateFrom = undefined;
		this.dateTo = undefined;	
	}

    open(action) {
        this.openModal.emit(action);
    }

    setEmpties() {
		var stateCheck = CheckEmpty(this.accountState);
		if (stateCheck === -1) {
			this.accountState.unshift(this.config.choose);
		}
		var typeCheck = CheckEmpty(this.accountType);
		if (typeCheck === -1) {
			this.accountType.unshift(this.config.choose);
		}
	}
	
	setLists() {
		this.accountState = [...this.config.accountState];
        this.accountState.unshift(this.config.chooseAll);
		this.accountType = [...this.config.accountType];
        this.accountType.unshift(this.config.chooseAll);
	}
}
