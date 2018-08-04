import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { CookieOptionsArgs } from '../model/cookieOptionArgs';

import { Product, NameSearch } from '../model/product';
import { ProductShort } from '../model/productShort';
import { Category } from '../model/category';
import { Config } from '../config';
import { LoginService } from '../service/login.service';
import { Message } from '../shared/functions';
import { MessageService } from '../service/message.service';
import { ModalProductBasic } from '../modal/productBasic.component';
import { Modified } from '../model/modified';
import { NewestOrder } from '../model/newestOrder';
import { Printing } from '../model/printing';
import { ProductService } from '../service/product.service';
import { Standard } from '../model/standard';

@Component({
  	selector: 'app-product',
  	templateUrl: './product.component.html',
  	styleUrls: ['./product.component.css'],
  	encapsulation: ViewEncapsulation.None,
	styles: [`
		.current-modal { position: fixed; top: 10% }
		.modal-content { width: 120% }`
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
	newestOrders: { new: number, old: number };
	newestSearch: boolean = false;
	noModified: boolean = false;
	printingEmpty: boolean;
	printingList: Printing[];
	printingSearch: boolean = false;
	productList: ProductShort[];
	searchInProgress: boolean = false;
	self: string = 'products';
	subscription;
	token: string;
	url: string;
	urlFiles: string;

	constructor(
		private config: Config, 
		private cookieService: CookieService, 
		private loginService: LoginService, 
		private messageService: MessageService,
		private modalService: NgbModal,  
		private product: Product, 
		private route: ActivatedRoute,
		private router: Router,
		private service: ProductService, 
	) {
		this.url = this.config.serverPath;
		this.urlFiles = this.config.serverPath + 'cms_spa/files/';
		this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
		this.service.listEmitter.subscribe((response) => this.nameSearch(response));
		this.service.loading.subscribe((type) => {
			this.idSearchInProgress = type === 'id';
			this.searchInProgress = type === 'name';
		});
		this.service.save.subscribe(() => this.saveProduct(this.service.getProduct()));
		this.service.singleProductEmitter.subscribe((response) => this.idSearch(response));
		this.subscription = this.service.interval.subscribe( () => this.getNewestOrders() );
	}

	ngOnInit() { this.initModule() }

	ngDoCheck() { this.setChildren() }

	ngOnDestroy() { this.unsubscribe() }

	deleteNewest(event) {
		delete(this.newestOrderNew);
		delete(this.newestOrderOld);
		this.service.deleteNewest(event.db, event.id)
			.subscribe( data => {
				if (data.success) {
					this.messageService.setMessage( Message('success', data.reason) );
					this.getNewestOrders();
				}
			});
	}

	deleteSingle(field, id) {
		this.service.deleteAdditional(field, id)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			this.messageService.setMessage( Message(curType, data.reason) );
			if (field === 'modified') {
				this.getModified();
			} else {
				this.getPrinting();
			}
		});
	}

	hideList() {
		this.noModified = false;
		this.service.setClear();
	}

	idSearch(response) {
		this.product = response;
		this.idSearchInProgress = false;
		this.openModal();
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

	getNewestOrders() {
		this.newestSearch = true;
		this.service.getNewestOrders()
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
		let result = this.service.getPrinting()
		.subscribe(data => {
			if (data.success && data.empty) {
				this.printingEmpty = true;
			} else if (data.success && !data.empty) {
				this.printingEmpty = false;
				this.printingList = data.list;
			}
			this.deliveryEmpty = data.emptyDelivery;
			this.deliveryList = data.deliveryList;
			this.printingSearch = false;
		});
	}

	initModule() {
		this.getLists();
		this.getNewestOrders();
		this.getModified();
		this.getPrinting();
	}

	logOut() {
		this.messageService.setMessage( Message('success', this.config.loggedOut, 'logOut', 'loginService') );
	}

	messageDisplay(data) {
		this.messageShow = data.display;
		this.messageType = data.type;
		this.messageValue = data.value;
	}

	nameSearch(response) {
		this.searchInProgress = true;
		this.noModified = false;
		setTimeout(() => {
			if (response.success === false) {
				this.emptySearch = true;
			} else {
				this.productList = response.map((el) => {
					el.imgPath = this.url + this.config.imageSuffix + el.id + '-' + el.image + '-thickbox.jpg';
					return el;
				});
				this.listLength = this.productList.length;
				this.emptySearch = false;
			}
			this.noModified = true;
			this.searchInProgress = false;
		}, 0);
	}

	openModal() {
		const modalRef = this.modalService.open(ModalProductBasic, { windowClass: 'current-modal' });
  		modalRef.componentInstance.product = this.product;
		modalRef.result.then((refresh) => {
  			if (refresh && this.service.nameParams) {
				this.service.getNameSearch(this.service.nameParams).subscribe(data => this.nameSearch(data));
  			}
		});
	}

	postMessageAction(data) {
		if (this[data.object]) {
			if (data.action === 'navigate') {
				this.router.navigate(['../login']);
			} else {
				this[data.object][data.action]();
			}
		}
	}

	saveProduct(obj) {
		let curObj = {...obj, action: 'full', db: 'both', productCategories: []};
		curObj.quantity = parseInt(obj.quantityBoth);
		curObj.productTags = obj.tagString;
		obj.categories.forEach(el => {
			if (el.checked) { curObj.productCategories.push(el.id); }
		});
		['categories', 'manufactorers', 'productCategoriesName'].forEach(el => delete(curObj[el]));
		window.scrollTo(0, 0);
		this.service.updateProduct(curObj)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			window.scrollTo(0, 0);
			this.messageService.setMessage( Message(curType, data.reason) );
			this.getModified();
			this.service.setEditionRefresh();
		});	
	}

	setChildren() {
		this.children = (this.route.firstChild && this.route.firstChild.snapshot.params['id'] !== undefined);
	}

	unsubscribe() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
