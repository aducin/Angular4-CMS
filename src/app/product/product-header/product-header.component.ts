import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Config } from '../../config';
import { Category } from '../../model/category';
import { Standard } from '../../model/standard';

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

    @Input() category: Category[];
    @Input() children: boolean;
    @Input() clear: boolean;
    @Input() idSearchInProgress: boolean;
    @Input() inputDisabled: boolean;
    @Input() manufactorer: Standard[];
    @Input() searchInProgress: boolean;
    @Output() nameSearch = new EventEmitter<{name: string, category: number, manufactorer: number}>();
    @Output() searchId = new EventEmitter<number>();
    constructor(private config: Config) { }

    ngOnInit() {
        this.checkConstants();
  	}

    ngDoCheck() {
        this.checkConstants();
        if (this.children || this.clear) {
			this.currentCategory = 0;
            this.currentId = null;
            this.currentManufactorer = 0;
			this.currentName = '';
		}
        
    }

    checkConstants() {
        if (this.category && !this.currentCategory) {
            this.currentCategory = this.config.chooseCategory.id;    
        }
        if (this.manufactorer && !this.currentManufactorer) {
		    this.currentManufactorer = this.config.chooseManufactorer.id;
        }
    }

    isInt(value) {
  	    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	}

    idSearch() {
		this.error.id = !this.isInt(this.currentId);
		if (!this.error.id) {
			if (this.currentId > 10 && !this.idSearchInProgress) {
                this.searchId.emit(this.currentId);
			}
		}
	} 

    namePrepare() {
		if (this.currentName !== undefined && this.currentName.length > 3) {
			if (!this.searchInProgress) {
                let curObj = {
                    name: this.currentName,
                    category: this.currentCategory,
                    manufactorer: this.currentManufactorer
                };
				this.nameSearch.emit(curObj);
			}
		}
	} 
}
