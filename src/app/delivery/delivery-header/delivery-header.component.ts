import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { CheckEmpty } from '../../shared/functions';
import { DeliveryService } from '../../service/delivery.service';

@Component({
	selector: 'delivery-header',
	templateUrl: './delivery-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DeliveryHeaderComponent {
    currentStatus: number = -1;
    currentType: number = -1;
    dateFrom: any;
	dateTo: any;
    deliveryTypes: any[];
    status: any[];

    @Output() openModal = new EventEmitter<string>();
    @Input() loading: boolean;
    constructor(
        private config: Config,
        private parserFormatter: NgbDateParserFormatter,
        private service: DeliveryService
    ) {
        this.deliveryTypes = this.config.deliveryTypes;
        this.deliveryTypes.unshift(this.config.chooseAll); 
        this.status = this.config.deliveryStatus;
        this.status.unshift(this.config.chooseAll); 
        this.setEmpties();
        this.service.clear.subscribe(() => {
			this.clearHeader();
		});
    }

    clearHeader() {
        this.setEmpties();
		this.currentStatus = -1;
		this.currentType = -1;
		this.dateFrom = undefined;
		this.dateTo = undefined;    
    }

    checkDeliveries() {
        let data = [];
		if (this.currentStatus !== -1) {
			data.push( {
				key: 'status',
				value: this.currentStatus
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
		this.service.getCustomDeliveries(data);
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
