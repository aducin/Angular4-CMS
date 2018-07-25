import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../service/account.service';
import { Response } from '../model/response';
import { MainData } from '../mainData';

@Component({
	selector: 'account-modal',
	templateUrl: './accountModal.html'
})
export class AccountModal {

	error: boolean = false;
	disableInput: boolean = false;
	saveAllow: boolean = false;
	success: boolean = false;
	@Input() data;
    constructor(private mainData: MainData, public activeModal: NgbActiveModal, private service: AccountService) {}

	checkAmount() {
		this.data.error = isNaN(this.data.newAmount);
		this.data.saveAllow = !isNaN(this.data.newAmount);
		if (isNaN(this.data.newAmount)) {
			this.data.message = this.mainData.notANumber;
		} else {
			if (this.data.newAmount === '') {
				this.data.amount = this.data.amountOriginal;
				this.data.saveAllow = false;
			} else {
				var old: any = this.data.amountOriginal;
				let newVal: any = this.data.newAmount;
				if (this.data.action === 'add') {
					this.data.amount = parseFloat(old) + parseFloat(newVal);
				} else {
					this.data.amount = parseFloat(old) - parseFloat(newVal);
				}
			}
		}
	}
    
}