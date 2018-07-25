import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../service/account.service';
import { Response } from '../model/response';
import { Config } from '../config';

@Component({
	selector: 'account-modal',
	templateUrl: './accountModal.html'
})
export class AccountModal {

	error: boolean = false;
	dates: any = ['createTime', 'cashTime', 'receiptTime'];
	disableInput: boolean = false;
	fields: any = ['id', 'type', 'amount', 'recipient', 'address', 'receipt', 'locs', 'coach', 'element', 'accessories', 'book', 'car', 'closed'];
	saveAllow: boolean = false;
	success: boolean = false;
	@Input() data;
    constructor(private config: Config, public activeModal: NgbActiveModal, private service: AccountService) {}

	checkAmount() {
		var amount = null;
		this.data.error = false;
		if (this.data.obj.amount !== undefined) {
			amount = this.data.obj.amount;
			this.data.error = isNaN(amount);
		}
		if (this.data.error) {
			this.data.message = this.config.notANumber;
			this.data.saveAllow = false;
		} else {
			this.data.saveAllow = true;
			['closed', 'type'].forEach((el) => {
				if (this.data.obj[el] === -1) {
					this.data.saveAllow = false;
				}
			});
			['recipient', 'amount'].forEach((el) => {
				if (this.data.obj[el] === undefined || (this.data.obj[el] === '')) {
					this.data.saveAllow = false;
				}
			});
			var empty = 0;
			['cashTime', 'receiptTime'].forEach((el) => {
				if (this.data[el].year === undefined) {
					empty++;
				}
			});	
			if (empty === 2) {
				this.data.saveAllow = false;
			}
		}
	}

	removeChoose(field) {
		var curField = field === 'closed' ? 'state' : field;
		var idCheck = this.data[curField].findIndex((el)=>{ return (el.id === -1); });
		if (idCheck !== -1) {
			this.data[curField].splice(idCheck, 1);
		}
		this.checkAmount();
	}

	save() {
		let method = this.data.action === 'add' ? 1 : 2;
		var obj = {};
		var outerObj = this.data.obj;
		this.fields.forEach((el) => {
			obj[el] = outerObj[el] !== undefined &&  outerObj[el] !== '' ? outerObj[el] : null;
		});
		var outerDate = this.data;
		this.dates.forEach((el) => {
			obj[el] = null;
			if (outerDate[el] !== undefined && outerDate[el].year !== undefined) {
				obj[el] = outerDate[el].year + '-' + outerDate[el].month + '-' + outerDate[el].day;
			}
		});
		var finalObj = {
			data: obj,
		};
		this.disableInput = true;
		this.service.setAccount(finalObj, method, this.data.token)
		.subscribe( data => {
			this.data.message = data.reason;
			if (data.success) {
				this.data.success = true;
			} else {
				this.data.error = true;
				this.disableInput = false;
			}
			var curBool = this.data.success;
			var outerThis = this;
			setTimeout(() => {
				outerThis.activeModal.close(curBool);
            }, 2000);
		});
	}
    
}