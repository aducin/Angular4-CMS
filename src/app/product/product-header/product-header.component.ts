import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operators';
import 'rxjs/Rx';

import { Config } from '../../config';
import { Category } from '../../model/category';
import { Standard } from '../../model/standard';
import { ProductService } from '../../service/product.service';

@Component({
	selector: 'product-header',
	templateUrl: './product-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProductHeaderComponent implements OnInit {
    currentCategory: number;
    currentId: number;
    currentManufactorer: number;
    currentName: string = '';
    error: any = { id: false };  
    subscription: any;
    timeout: boolean = false;

    @Input() category: Category[];
    @Input() children: boolean;
    @Input() idSearchInProgress: boolean;
    @Input() inputDisabled: boolean;
    @Input() manufactorer: Standard[];
    @Input() searchInProgress: boolean;
    constructor(
        private config: Config,
        private service: ProductService
    ) {
        this.currentCategory = this.config.chooseCategory.id;
        this.currentManufactorer = this.config.chooseManufactorer.id;  
    }

    ngOnInit() {
        this.service.clear.subscribe(() => this.clear(true));
  	}

    ngAfterViewInit() {
        Observable.fromEvent(document.getElementById("idInput"), 'keyup') 
        .debounceTime(this.config.searchInterval)
        .flatMap(e => {
            if (isNaN(this.currentId) || this.currentId < 13) {
                this.error.id = true;
                return Observable.throw('0');
            } else {
                this.clear(false);
                this.error.id = false;
                return Observable.of(this.currentId);  
            }
        })
        .flatMap(id => this.service.getIdSearch(id, 'header'))
        .retry()
        .subscribe(response => this.service.emitSingleData(response));

        Observable.fromEvent(document.getElementById("name"), 'keyup')
        .debounceTime(this.config.searchInterval)
        .flatMap(e => this.handleNameObservable())
        .retry()
        .subscribe(response => this.service.emitListData(response));

        Observable.fromEvent(document.getElementsByClassName("nameSearch"), 'change') 
        .flatMap(e => this.handleNameObservable())
        .retry()
        .subscribe(response => this.service.emitListData(response));
    }

    clear(all) {
		this.currentCategory = 0;
        this.currentManufactorer = 0;
		this.currentName = '';
        if (all) {
            this.currentId = null;
        }
    }

    handleNameObservable() {
        if (this.currentName && this.currentName.length > 3 && !this.searchInProgress) {
               this.currentId = null;
               let curObj = {
                    name: this.currentName,
                    category: this.currentCategory,
                    manufactorer: this.currentManufactorer
               };
               return this.service.getNameSearch(curObj);   
        } else {
               return Observable.throw('1');
        }
    }

    /*
    idSearch() {
		this.error.id = !this.isInt(this.currentId);
		if (!this.error.id) {
            setTimeout(() => {
                if (this.currentId > 10 && !this.idSearchInProgress) {
                    this.clear(false);
                    this.service.getIdSearch(this.currentId, 'header');
                }
            }, this.config.searchInterval);
		}
	} 

    isInt(value) {
  	    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	}
    
    namePrepare() {
        if (!this.timeout && this.currentName && this.currentName.length > 3) {
            this.timeout = true;
            setTimeout(() => {
                if (this.currentName && this.currentName.length > 3) {
                    this.nameSearch();
                }
                this.timeout = false;
            }, this.config.searchInterval);
        }
	} 

    nameSearch() {
        if (this.currentName && this.currentName.length > 3) {
            if (!this.searchInProgress) {
                this.currentId = null;
                this.service.getNameSearch({
                    name: this.currentName,
                    category: this.currentCategory,
                    manufactorer: this.currentManufactorer
                });
            }
        }
    }
    */
}
