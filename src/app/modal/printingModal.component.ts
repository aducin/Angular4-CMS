import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from '../service/product.service';
import { Response } from '../model/response';
import { Config } from '../config';

@Component({
	selector: 'printing-modal',
	templateUrl: './printingModal.html'
})
export class PrintingModal {

    @Input() data;
    disableInput: boolean = false;
    message: string;
    name: string;
    saveAllow: boolean = false;
    title: string = 'Nowy dokument do wydruku';
    constructor(
        private config: Config, 
        public activeModal: NgbActiveModal, 
        private service: ProductService
    ) {}

    ngOnInit() {
        this.name = this.data.file[0].name;
    }

    checkSave() {
        let curLength = this.data.description.length;
        this.saveAllow = curLength > 2;
    }

    save() {
        this.disableInput = true;
        this.saveAllow = false;
        this.service.addPrinting(this.data)
        .subscribe( data => {
            this.message = data.reason;
            if (data.success) {
                this.data.success = true;
            } else {
                this.data.error = true;
            }
            var outerThis = this;
            setTimeout(() => { 
                outerThis.activeModal.close(true);
            }, this.config.timer);
        });    
    }
}