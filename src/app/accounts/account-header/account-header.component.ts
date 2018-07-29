import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { CheckEmpty } from '../../shared/functions';
import { AccountService } from '../../service/account.service';

@Component({
	selector: 'account-header',
	templateUrl: './account-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AccountHeaderComponent {
    accountState: any[];
	accountType: any[];
    currentState: number = -1;
	currentType: number = -1;
    dateFrom: any;
	dateTo: any;

    @Input() loading: boolean;
    @Input() refresh: boolean;
    @Output() openModal = new EventEmitter<string>();
    constructor(
        private config: Config,
        private parserFormatter: NgbDateParserFormatter,
		private service: AccountService
    ) {
        this.accountState = this.config.accountState;
        this.accountState.unshift(this.config.chooseAll);
		this.accountType = this.config.accountType;
        this.accountType.unshift(this.config.chooseAll);
		this.service.clear.subscribe(() => this.clearHeader());
    }

    checkAccounts() {
		let data = [];
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
}
