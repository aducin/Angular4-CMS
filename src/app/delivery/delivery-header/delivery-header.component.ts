import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Config } from '../../config';
import { CheckEmpty } from '../../shared/functions';
import { DeliveryService } from '../../service/delivery.service';

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
	subscription: any;

    @Output() openModal = new EventEmitter<string>();
    @Input() loading: boolean;
    constructor(
        private config: Config,
        private parserFormatter: NgbDateParserFormatter,
        private service: DeliveryService
    ) {
		this.setLists();
        this.service.clear.subscribe(() => this.clearHeader());
    }

	ngOnInit() {}

	ngAfterViewInit() {
		this.subscription = Observable.fromEvent(document.getElementsByClassName("checkDeliveries"), 'change')
		.switchMap(e => this.service.getCustomDeliveries(this.setParams()))
		.subscribe((result) => this.service.setResult(result));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

    clearHeader() {
        this.setEmpties();
		this.currentStatus = -1;
		this.currentType = -1;
		this.dateFrom = undefined;
		this.dateTo = undefined;    
    }

    checkDeliveries() {
		this.service.getCustomDeliveries(this.setParams())
		.subscribe((result) => this.service.setResult(result));
    }

    open(action) {
        this.openModal.emit(action);
    }

    setEmpties() {
        let typeCheck = CheckEmpty(this.deliveryTypes);
        if (typeCheck === -1) {
			this.deliveryTypes.unshift(this.config.chooseAll);
        }
		let statusCheck = CheckEmpty(this.status);
		if (statusCheck === -1) {
			this.status.unshift(this.config.chooseAll);
		}
	}

	setLists() {
		this.deliveryTypes = [...this.config.deliveryTypes];
		this.deliveryTypes.unshift(this.config.chooseAll); 
		this.status = [...this.config.deliveryStatus];
		this.status.unshift(this.config.chooseAll);
	}

	setParams() {
		return this.config.deliveryHeaders.reduce((array, single) => {
			let currentName = single.fullName;
			if (this[currentName] !== undefined && this[currentName] !== -1) {
				let value = typeof(this[currentName]) === 'number' ? this[currentName] : this.parserFormatter.format(this[currentName]);
				array.push({ key: single.name, value });
			}
			return array;
		}, []);
	}
}
