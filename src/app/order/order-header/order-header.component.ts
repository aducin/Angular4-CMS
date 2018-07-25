import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Config } from '../../config';

@Component({
	selector: 'order-header',
	templateUrl: './order-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OrderHeaderComponent {
    actionId: number;
    curAction: number = -1;
	curPanel: number = -1;
    orderId: number;
    stopAction: boolean = true;
	stopOrder: boolean = true;

    @Input() actions: any;
    @Input() panels: any;
    @Output() removeOption = new EventEmitter<string>(); 
    constructor(
		private config: Config, 
		private router: Router
	) { }

    handleButton(origin) {
		if (origin === 'order') {
			var curNumber = isNaN(this.orderId);
			this.stopOrder = this.curPanel === -1 || curNumber || this.orderId < 1;
		} else {
			var curNumber = isNaN(this.actionId);
			this.stopAction = this.curAction === -1 || curNumber || this.actionId < 1;
		}
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
        this.removeOption.emit(field);
	}
}
