import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { CheckEmpty } from '../../shared/functions';

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

    @Input() loading: boolean;
    @Input() refresh: boolean;
    @Output() check = new EventEmitter<any>();
    @Output() openModal = new EventEmitter<string>();
    constructor(
        private config: Config,
        private parserFormatter: NgbDateParserFormatter
    ) {
        this.accountState = this.config.accountState;
        this.accountState.unshift(this.config.chooseAll);
		this.accountType = this.config.accountType;
        this.accountType.unshift(this.config.chooseAll);
    }

    ngOnInit() {
  	}

    ngDoCheck() {
        if (this.refresh) {
            this.setEmpties();
			this.currentState = -1;
			this.currentType = -1;
			this.dateFrom = undefined;
			this.dateTo = undefined;
        }
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
		this.check.emit(data);
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
