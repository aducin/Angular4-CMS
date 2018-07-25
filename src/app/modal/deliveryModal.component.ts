import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DeliveryService } from '../service/delivery.service';
import { Response } from '../model/response';
import { Config } from '../config';

@Component({
	selector: 'delivery-modal',
	templateUrl: './deliveryModal.html'
})
export class DeliveryModal {

    anyNumber: boolean = false;
    error: any;
    errorDisplay: boolean = false;
	dates: any = ['documentDate'];
	disableInput: boolean = false;
    fields: any = ['number', 'name'];
    message: string;
    numbers: string[] = ['locs', 'coaches', 'elements', 'accessories', 'books', 'cars'];
	saveAllow: boolean = false;
	success: boolean = false;
	@Input() data;
    constructor(private config: Config, public activeModal: NgbActiveModal, private service: DeliveryService) {
        this.error = {
            locs: false,
            coaches: false,
            elements: false,
            accessories: false,
            books: false,
            cars: false,
        };
        this.message = this.config.notANumber;
    }

    check() {
        this.anyNumber = false;
        this.error = [];
        this.errorDisplay = false;
        this.saveAllow = true;
        this.numbers.forEach((el) => {
            if (this.data.obj[el] !== undefined && this.data.obj[el] !== null && this.data.obj[el] !== '') {
                let numberError = isNaN(this.data.obj[el]);
                if (numberError) {
                    this.error[el] = true;
                    this.errorDisplay = true;
                    this.saveAllow = false;
                } else {
                    this.anyNumber = true;
                }
            }
        });
        this.fields.forEach((el) => {
            if (this.data.obj[el] === undefined || this.data.obj[el] === null || this.data.obj[el].length < 3) {
                this.saveAllow = false;
            }
        }); 
        if (this.data.obj.toPrint.id === -1) {
            this.saveAllow = false;
        } 
        if (this.data.obj.type.id === -1) {
            this.saveAllow = false;
        } 
        if (!this.anyNumber) {
            this.saveAllow = false;
        }
    }

    removeChoose(field) {
		var idCheck = this.data[field].findIndex((el)=>{ return (el.id === -1); });
		if (idCheck !== -1) {
			this.data[field].splice(idCheck, 1);
		}
		this.check();
    }
    
    save() {
        this.disableInput = true;
        this.numbers.forEach((el) => {
            this.data.obj[el] = (this.data.obj[el] !== undefined && this.data.obj[el] !== '') ? this.data.obj[el] : null;
        });
        let curDate = <string>this.data.dateTime.year + '-' + this.data.dateTime.month + '-' + this.data.dateTime.day;
        this.data.obj.documentDate = curDate;
        let method = this.data.action === 'add' ? 1 : 2;
        let promise = this.service.setDeliveries(this.data.obj, method, this.data.token)
        .subscribe( data => {
            console.log(data);
            this.message = data.reason;
            if (data.success) {
                this.success = true;
            } else {  
                this.disableInput = false;
                this.errorDisplay = true;
            } 
            var outerThis = this;
            var curBool = this.success;
			setTimeout(() => {
				outerThis.activeModal.close(curBool);
            }, 2000);
        });   
    }
}