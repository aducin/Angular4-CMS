import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PostalService } from '../service/postal.service';
import { Response } from '../model/response';
import { MainData } from '../mainData';

@Component({
	selector: 'postal-modal',
	templateUrl: './postalModal.html'
})
export class PostalModal {

    disableInput: boolean = false;
    @Input() data;
    constructor(private mainData: MainData, public activeModal: NgbActiveModal, private service: PostalService) {}

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

    save() {
        let amount = <any>this.data.newAmount;
        let data = <any>{
            action: this.data.action,
            amount: parseFloat(amount),
            token: this.data.token
        };
        this.disableInput = true;
        this.service.setPostal(data)
        .subscribe( data => {
            this.data.success = data.success;
            this.data.error = !data.success;
            this.data.message = data.reason;
            var outerThis = this;
            setTimeout(function() { 
                outerThis.data.success = outerThis.data.error = false;
                outerThis.activeModal.close(true);
            }, 3000);
        });    
    }
}