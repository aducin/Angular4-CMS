import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { CookieOptionsArgs } from '../model/cookieOptionArgs';

import { Category } from '../model/category';
import { Lists } from '../model/lists';
import { Product, NameSearch } from '../model/product';
import { ProductShort } from '../model/productShort';
import { Config } from '../config';
import { LoginService } from '../service/login.service';
import { Message } from '../shared/functions';
import { MessageService } from '../service/message.service';
import { ModalProductBasic } from '../modal/productBasic.component';
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
	noModified: boolean = false;
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
		private lists: Lists,
		private loginService: LoginService, 
		private messageService: MessageService,
		private modalService: NgbModal,  
		private product: Product, 
		private route: ActivatedRoute,
		private router: Router,
		private service: ProductService
	) {
		this.url = this.config.serverPath;
		this.urlFiles = this.config.serverPath + 'cms_spa/files/';
		this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
		this.service.listEmitter.subscribe((response) => this.nameSearch(response));
		this.service.lists.subscribe((lists) => this.setLists(lists));
		this.service.loading.subscribe((type) => {
			this.idSearchInProgress = type === 'id';
			this.searchInProgress = type === 'name';
		});
		this.service.singleProductEmitter.subscribe((response) => this.idSearch(response));
	}

	ngOnInit() { this.lists.getLists() }

	ngDoCheck() { this.setChildren() }

	ngOnDestroy() { this.unsubscribe() }

	hideList() {
		this.noModified = false;
		this.service.setClear();
	}

	idSearch(response) {
		this.product = response;
		this.idSearchInProgress = false;
		this.openModal();
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

	setChildren() {
		this.children = (this.route.firstChild && this.route.firstChild.snapshot.params['id'] !== undefined);
	}

	setLists(lists) {
		this.category = lists.categories;
		this.manufactorer = lists.manufactorers;
		this.inputDisabled = false;
		this.error = { id: false };
	}

	unsubscribe() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
