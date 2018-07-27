import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

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

    clear(all) {
		this.currentCategory = 0;
        this.currentManufactorer = 0;
		this.currentName = '';
        if (all) {
            this.currentId = null;
        }
    }

    isInt(value) {
  	    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	}

    idSearch() {
		this.error.id = !this.isInt(this.currentId);
		if (!this.error.id) {
			if (this.currentId > 10 && !this.idSearchInProgress) {
                this.clear(false);
                this.service.idSearch.emit(this.currentId);
			}
		}
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
                this.service.setNameSearch({
                    name: this.currentName,
                    category: this.currentCategory,
                    manufactorer: this.currentManufactorer
                });
            }
        }
    }
}
