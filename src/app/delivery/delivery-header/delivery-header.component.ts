import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { CheckEmpty } from '../../shared/functions';

@Component({
	selector: 'delivery-header',
	templateUrl: './delivery-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DeliveryHeaderComponent implements OnInit {
    currentStatus: number = -1;
    currentType: number = -1;
    dateFrom: any;
	dateTo: any;
    deliveryTypes: any[];
    status: any[];

    @Output() getDeliveries = new EventEmitter<any>();
    @Output() openModal = new EventEmitter<string>();
    @Input() loading: boolean;
    @Input() refresh: boolean;
    constructor(
        private config: Config,
        private parserFormatter: NgbDateParserFormatter
    ) {
        this.deliveryTypes = this.config.deliveryTypes;
        this.deliveryTypes.unshift(this.config.chooseAll); 
        this.status = this.config.deliveryStatus;
        this.status.unshift(this.config.chooseAll); 
        this.setEmpties();
    }

    ngOnInit() {
  	}

    ngDoCheck() {
        if (this.refresh) {
            this.setEmpties();
			this.currentStatus = -1;
			this.currentType = -1;
			this.dateFrom = undefined;
			this.dateTo = undefined;
        }
    }

    checkDeliveries() {
        var curObj = {
        status: <string>'',
        type: <string>'',
        dateFrom: <string>'',
        dateTo: <string>'',
        };
        ['currentStatus', 'currentType'].forEach((el) => {
        if (this[el] !== -1) {
            let name = el.split('current');
            let final = name[1].toLowerCase();
            curObj[final] = this[el];
        }
        });
        ['dateFrom', 'dateTo'].forEach((el) => {
        if (this[el] !== undefined) {
            curObj[el] = this[el].year + '-' + this[el].month + '-' + this[el].day;
        }
        }); 
        this.getDeliveries.emit(curObj);
    }

    open(action) {
        this.openModal.emit(action);
    }

    setEmpties() {
        let typeCheck = CheckEmpty(this.deliveryTypes);
        if (typeCheck === -1) {
			this.deliveryTypes.unshift(this.config.chooseAll);
        }
		var statusCheck = CheckEmpty(this.status);
		if (statusCheck === -1) {
			this.status.unshift(this.config.chooseAll);
		}
	}
}