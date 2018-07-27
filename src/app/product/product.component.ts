import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { CookieOptionsArgs } from '../model/cookieOptionArgs';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Product } from '../model/product';
import { ProductShort } from '../model/productShort';
import { Category } from '../model/category';
import { Modified } from '../model/modified';
import { NewestOrder } from '../model/newestOrder';
import { Printing } from '../model/printing';
import { Standard } from '../model/standard';
import { ProductService } from '../service/product.service';
import { LoginService } from '../service/login.service';
import { Config } from '../config';
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
	clear: boolean = false;
	cookieOptionArgs: CookieOptionsArgs;
	deliveryEmpty: boolean;
	deliveryList: any[];
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
	newestOrderNew: NewestOrder[];
	newestOrderOld: NewestOrder[];
	newestOrders: {
		new: number,
		old: number,
	};
	newestSearch: boolean = false;
	noModified: boolean = false;
	printingEmpty: boolean;
	printingList: Printing[];
	printingSearch: boolean = false;
	productList: ProductShort[];
	saveInProgress: boolean = false;
	searchInProgress: boolean = false;
	self: string = 'products';
	subscription;
	timer: number = 300000;
	token: string;
	url: string;
	urlFiles: string;

	constructor(
		private cookieService: CookieService, 
		private loginService: LoginService, 
		private service: ProductService, 
		private product: Product, 
		private config: Config, 
		private modalService: NgbModal,  
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.token = localStorage.getItem('angular4Token');
		if (this.token === undefined || this.token === null) {
			this.token = this.cookieService.get('angular4Token');
		}
		this.imagePath = this.config.imageSuffix;
		this.url = this.config.serverPath;
		this.urlFiles = this.config.serverPath + 'cms_spa/files/';
		this.getLists();
		this.getModified();
		this.getNewestOrders();
		this.setOrdersInterval();
		this.getPrinting();
	}

	ngDoCheck() {
		this.children = (this.route.firstChild && this.route.firstChild.snapshot.params['id'] !== undefined);
		if (this.service.getToSave() && !this.saveInProgress) {
			this.saveInProgress = true;
			let curObj = this.service.getProduct();
			this.saveProduct(curObj);
		}
	}

	ngOnDestroy() {
		this.unsubscribe();
	}

	deleteSingle(field, id) {
		this.service.deleteAdditional(field, id, this.token)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			this.displayMessage(curType, data.reason, 3000);
			if (field === 'modified') {
				this.getModified();
			} else if (field === 'printing') {
				this.getPrinting();
			}
		});
	}

	deleteNewest(event) {
		delete(this.newestOrderNew);
		delete(this.newestOrderOld);
		this.service.deleteNewest(event.db, event.id, this.token)
			.subscribe( data => {
				if (data.success) {
					this.displayMessage('success', data.reason, 2000);
					this.getNewestOrders();
				}
			});
	}

	displayMessage(messageType, messageValue, timer, method = null, action = null) {
		this.messageShow = true;
		this.messageType = messageType;
  		this.messageValue = messageValue;
  		setTimeout(() => {
			this.messageShow = false;
			if (method && action) {
				this[method][action]();
			}
		}, timer);
	}


	getLists() {
		let cachedCategories = JSON.parse(localStorage.getItem('categories'));
		let cachedManufactorers = JSON.parse(localStorage.getItem('manufactorers'));
		if (cachedCategories && cachedCategories[0] && cachedManufactorers && cachedManufactorers[0]) {
			this.category = cachedCategories;
			this.manufactorer = cachedManufactorers;
		} else {
			this.service.getBothLists()
			.subscribe( data => {
				this.category = data[0];
				this.category.unshift(this.config.chooseCategory);
				this.manufactorer = data[1];
				this.manufactorer.unshift(this.config.chooseManufactorer);
				localStorage.setItem('categories', JSON.stringify(this.category));
				localStorage.setItem('manufactorers', JSON.stringify(this.manufactorer));
			});
		}
		this.inputDisabled = false;
		this.error = { id: false };
	}

	getModified() {
		this.modifiedSearch = true;
		this.service.getAdditional('modified', this.token)
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

	getNewestOrders() {
		this.newestSearch = true;
		this.service.getNewestOrders(this.token)
			.subscribe( data => {
				if (data.success) {
					this.newestOrders = data.newest;
					if (data.list.new) {
						this.newestOrderNew = data.list.new;
					}
					if (data.list.old) {
						this.newestOrderOld = data.list.old;
					}
				}
				this.newestSearch = false;
			});
	}

	getPrinting() {
		this.printingSearch = true;
		this.service.getAdditional('printing', this.token)
		.subscribe( data => {
			if (data.success && data.empty) {
				this.printingEmpty = true;
			} else if (data.success && !data.empty) {
				this.printingEmpty = false;
				this.printingList = data.list;
			}
			this.deliveryEmpty = data.emptyDelivery;
			this.deliveryList = data.deliveryList;
		});	
		this.printingSearch = false;
	}

	hideList() {
		this.noModified = false;
		this.clear = true;
		setTimeout(() => {
			this.clear = false;	
		}, 0);
	}

	idSearch(id) {
		this.idSearchInProgress = true;
		setTimeout(() => { 
			this.inputDisabled = true; 
			this.service.getIdSearch(id)
			.subscribe( data => {
				this.inputDisabled = false;
				this.product = this.setDetails(data, true);
				this.productList = undefined;
				this.idSearchInProgress = false;
				this.openModal();
			});	
		}, 1000);
	}

	logOut() {
		this.displayMessage('success', this.config.loggedOut, this.config.timer, 'loginService', 'logOut');
	}

	nameSearch(obj) {
		this.emptySearch = false;
		this.searchInProgress = true;
		setTimeout(() => { 
			this.inputDisabled = true; 
			this.service.getNameSearch(obj.name, obj.category, obj.manufactorer)
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
		window.scrollTo(0, 0);
		this.service.updateProduct(curObj)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			window.scrollTo(0, 0);
			this.saveInProgress = false;
			this.service.setRefresh(true);
			this.displayMessage(curType, data.reason, 3000);
			this.getModified();
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

	setOrdersInterval() {
		const source = Observable.interval(this.timer);
		this.subscription = source.subscribe(() => {
			this.getNewestOrders();
		});
	}

	unsubscribe() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
