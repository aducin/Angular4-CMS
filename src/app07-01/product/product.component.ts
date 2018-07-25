import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { CookieOptionsArgs } from '../model/cookieOptionArgs';

import { Product } from '../model/product';
import { ProductShort } from '../model/productShort';
import { Category } from '../model/category';
import { Modified } from '../model/modified';
import { Standard } from '../model/standard';
import { ProductService } from '../service/product.service';
import { LoginService } from '../service/login.service';
import { MainData } from '../mainData';
import { ModalProductBasic } from '../modal/productBasic.component';

@Component({
  	selector: 'app-product',
  	templateUrl: './product.component.html',
  	styleUrls: ['./product.component.css'],
  	encapsulation: ViewEncapsulation.None,
	styles: [`
		.current-modal {
			position: fixed;
			top: 10%;
		}
		.modal-content {
			width: 120%;
		}`
	]
})
export class ProductComponent implements OnInit {

	category: Category[];
	children: boolean;
	chooseCategory: any = { id: 0, metaTitle: 'Proszę wybrać'};
	chooseManufactorer: any = { id: 0, name: 'Proszę wybrać'};
	cookieOptionArgs: CookieOptionsArgs;
	currentCategory: number;
	currentId: number;
	currentManufactorer: number;
	currentName: string;
	emptySearch: boolean = false;
	error;
	idSearchInProgress: boolean = false;
	imagePath: string;
	inputDisabled: boolean = true;
	listLength: number = 0;
	manufactorer: Standard[];
	messageShow: boolean = false;
	messageType: string;
	messageValue: string;
	modifiedList: Modified[];
	modifiedEmpty: boolean;
	modifiedSearch: boolean = true;
	noModified: boolean = false;
	productList: ProductShort[];
	saveInProgress: boolean = false;
	searchInProgress: boolean = false;
	url: string;

	constructor(private cookieService: CookieService, private loginService: LoginService, private service: ProductService, private product: Product, private mainData: MainData, private modalService: NgbModal,  
		private route: ActivatedRoute) { 
	}

	ngOnInit() {
		this.imagePath = this.mainData.imageSuffix;
		this.url = this.mainData.serverPath;
		this.getLists();
		this.getModified();
	}

	ngDoCheck() {
		this.children = (this.route.firstChild !== null && this.route.firstChild.snapshot.params['id'] !== undefined);
		if (this.children) {
			this.currentId = null;
			this.currentName = undefined;
		}
		if (this.service.getToSave() && !this.saveInProgress) {
			this.saveInProgress = true;
			let curObj = this.service.getProduct();
			this.saveProduct(curObj);
		}
	}

	deleteModified(id) {
		/*
		this.service.deleteModified(id)
  		.subscribe( data => {
  			this.messageType = data.success !== false ? 'success' : 'error';
  			this.messageValue = data.reason;
  			this.messageShow = true;
  			this.getModified();
  			setTimeout(() => { 
  				this.messageShow = false;
  			}, 3000);
  		});
  		*/
  		this.service.deleteModified(id)
  		.subscribe( data => {
  			let curType = data.success !== false ? 'success' : 'error';
  			this.displayMessage(curType, data.reason, 3000);
  			this.getModified();
  		});
	}

	displayMessage(messageType, messageValue, timer, method = null, action = null) {
		this.messageShow = true;
		this.messageType = messageType;
  		this.messageValue = messageValue;
  		setTimeout(() => { 
  			this.messageShow = false;
  			if (method !== null && action !== null) {
  				this[method][action]();
  			}
		}, timer);
	}

	getLists() {
		let cachedCategories = JSON.parse(localStorage.getItem('categories'));
		let cachedManufactorers = JSON.parse(localStorage.getItem('manufactorers'));
		if (cachedCategories !== null && cachedCategories[0] && cachedManufactorers !== null && cachedManufactorers[0]) {
			this.category = cachedCategories;
			this.manufactorer = cachedManufactorers;
		} else {
			this.service.getBothLists()
			.subscribe( data => {
				this.category = data[0];
				this.category.unshift(this.chooseCategory);
				this.manufactorer = data[1];
				this.manufactorer.unshift(this.chooseManufactorer);
				localStorage.setItem('categories', JSON.stringify(this.category));
				localStorage.setItem('manufactorers', JSON.stringify(this.manufactorer));
			});
		}
		this.currentCategory = this.chooseCategory.id;
		this.currentManufactorer = this.chooseManufactorer.id;
		this.inputDisabled = false;
		this.error = { id: false };
		/*
		this.service.getBothLists()
		.subscribe( data => {
			this.category = data[0];
			this.category.unshift(this.chooseCategory);
			this.currentCategory = this.chooseCategory.id;
			this.manufactorer = data[1];
			this.manufactorer.unshift(this.chooseManufactorer);
			this.currentManufactorer = this.chooseManufactorer.id;
			this.inputDisabled = false;
			this.error = { id: false };
			localStorage.setItem('categories', JSON.stringify(this.category));
			localStorage.setItem('manufactorers', JSON.stringify(this.manufactorer));
		});
		*/
	}

	getModified() {
		this.modifiedSearch = true;
		this.service.getModified()
		.subscribe( data => {
			if (data[0] !== undefined) {
				this.modifiedList = data;
				this.modifiedEmpty = false;
			} else {
				this.modifiedEmpty = true;
			}
			this.noModified = false;
			this.modifiedSearch = false;
		});
	}

	hideList() {
		this.noModified = false;
		this.currentCategory = 0;
		this.currentManufactorer = 0;
		this.currentName = '';
	}

	idSearch() {
		this.error.id = !this.isInt(this.currentId);
		if (!this.error.id) {
			if (this.currentId > 10 && !this.idSearchInProgress) {
				this.idSearchInProgress = true;
				setTimeout(() => { 
					this.inputDisabled = true; 
					this.service.getIdSearch(this.currentId)
					.subscribe( data => {
						this.inputDisabled = false;
						this.product = this.setDetails(data, true);
						this.productList = undefined;
						this.idSearchInProgress = false;
						this.openModal();
					});	
				}, 1000);
			}
		}
		
	}

	isInt(value) {
  		return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	}

	logOut() {
		this.displayMessage('success', this.mainData.loggedOut, 3000, 'loginService', 'logOut');
	}

	namePrepare() {
		if (this.currentName !== undefined && this.currentName.length > 3) {
			if (!this.searchInProgress) {
				this.searchInProgress = true;
				this.nameSearch();
			}
		}
	}

	nameSearch() {
		this.emptySearch = false;
		setTimeout(() => { 
			this.inputDisabled = true; 
			this.service.getNameSearch(this.currentName, this.currentCategory, this.currentManufactorer)
			.subscribe( data => {
				this.noModified = true;
				if (data.success !== undefined && data.success === false) {
					this.emptySearch = true;
				} else {
					this.productList = data.map((el) => {
						el = this.setDetails(el, false);
						return el;
					});
					this.listLength = this.productList.length;
					this.emptySearch = false;
				}
				this.inputDisabled = this.searchInProgress = false;
			});	
		}, 1000);
	}

	openModal() {
		const modalRef = this.modalService.open(ModalProductBasic, { windowClass: 'current-modal' });
  		modalRef.componentInstance.product = this.product;
	}

	saveProduct(obj) {
		let curObj = <any>{};
		let curAmount = obj.quantityBoth
		curObj = obj;
		curObj.action = 'full';
		curObj.db = 'both';
		curObj.quantity = parseInt(curAmount);
		curObj.productTags = obj.tagString;
		curObj.productCategories = <any>[];
		obj.categories.forEach(el => {
			if (el.checked) { curObj.productCategories.push(el.id); }
		});
		['categories', 'manufactorers', 'productCategoriesName'].forEach(el => {
			delete(curObj[el]);
		});
		this.service.updateProduct(curObj)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			window.scrollTo(0, 0);
			this.saveInProgress = false;
			this.service.setRefresh(true);
			this.displayMessage(curType, data.reason, 3000);
		});	
	}

	setDetails(el, deep) {
		el.imgPath = this.url + this.imagePath + el.id + '-' + el.image + '-thickbox.jpg';
		if(deep) {
			if (!el.discount.new && !el.discount.old) {
				var block = false;
				el.priceReal = {
					new: el.price.new,
					old: el.price.old,
				};
			} else {
				var block = true;
				var discountValue = 0;
				el.priceReal = {
					new: null,
					old: null,
				};
				if (el.discount.new.reduction !== undefined) {
					if (el.discount.new.reductionType === 'amount') {
						el.priceReal.new = Math.round((el.price.new - el.discount.new.reduction) * 100) / 100;
					} else if (el.discount.new.reductionType === 'percentage') {
						let curAmount = el.price.new * (el.discount.new.reduction / 100);
						el.priceReal.new = Math.round((el.price.new - curAmount) * 100) / 100;
					}
					discountValue++;
				}
				if (el.discount.old.reduction !== undefined) {
					if (el.discount.old.reductionType === 'amount') {
						el.priceReal.old = Math.round((el.price.old - el.discount.old.reduction) * 100) / 100;
					} else if (el.discount.old.reductionType === 'percentage') {
						let curAmount = el.price.old * (el.discount.old.reduction / 100);
						el.priceReal.old = Math.round((el.price.old - curAmount) * 100) / 100;
					}
					discountValue++;
				}
				el.priceBlock = block;
				el.discountValue = discountValue;
			}
		}
		return el;
	}
}

