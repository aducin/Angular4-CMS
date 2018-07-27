import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CookieService } from 'ngx-cookie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DeliveryService } from '../service/delivery.service';

import { Config } from '../config';
import { Delivery } from '../model/delivery';

import { DeliveryModal } from '../modal/deliveryModal.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryComponent implements OnInit {

  amount: number;
  automatic: boolean = true;
  currentStatus: number = -1;
  currentType: number = -1;
  deliveries: Delivery[];
  deliveryTypes: any[];
  empty: boolean;
  loading: boolean = false;
  messageShow: boolean = false;
  messageType: string;
  messageValue: string;
  selected: number = 0;
  self: string = 'delivery';
  status: any[];
  success: boolean;
  token: string;
  constructor(
    private cookieService: CookieService,
    private config: Config,
    private modalService: NgbModal,
		private parserFormatter: NgbDateParserFormatter,
    private service: DeliveryService
  ) { 
    this.deliveryTypes = this.config.deliveryTypes;
    this.status = this.config.deliveryStatus;
    this.service.refresh.subscribe(() => {
			this.getDeliveries(this.service.params);
		});
  }

  ngOnInit() {
    this.token = localStorage.getItem('angular4Token');
		if (this.token === undefined || this.token === null) {
			this.token = this.cookieService.get('angular4Token');
		}
    this.getDeliveries();
  }

  checkDeliveries() {
    var curObj = {
      status: <string>'',
      type: <string>'',
      dateFrom: <string>'',
      dateTo: <string>'',
    };
    ['currentStatus', 'currentType'].forEach((el) => {
      if (this[el] !== -1) {
        let name = el.split('current');
        let final = name[1].toLowerCase();
        curObj[final] = this[el];
      }
    });
    ['dateFrom', 'dateTo'].forEach((el) => {
      if (this[el] !== undefined) {
        curObj[el] = this[el].year + '-' + this[el].month + '-' + this[el].day;
      }
    }); 
    this.getDeliveries(curObj);
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

  getDeliveries(params = null) {
    this.loading = true;
    this.service.getDeliveries(this.token, params)
    .subscribe( data => {
      this.automatic = params !== null ? false : this.automatic;
			this.handleData(data);
		});
  }

  handleData(data) {
    this.success = data.success;
		this.empty = Boolean(data.empty);
    this.loading = false;
    if (this.success && !this.empty) {
      this.deliveries = data.list;
      this.amount = data.list.length;
    }
  }

  handleSelected(id) {
    if (id === -1) {
        this.selected = 0;
        this.displayMessage('error', this.config.accountClosed, 3000);
    } else {
        this.selected = this.selected !== id ? id : 0;
    }
  }

  logOut() {
		this.displayMessage('success', this.config.loggedOut, 3000, 'loginService', 'logOut');
  }
  
  open(action) {
    var final = {
      action: <string>action,
      dateTime: <any>{},
      obj: <Delivery>{},
      status: <any>[],
      title: <string>'',
      token: <string>this.token,
      types: <any>[],
    };
    this.deliveryTypes.forEach((el) => {
      if (el.id !== -1) {
        final.types.push(el);
        final.title = this.config.deliveryTitle[0];
      }
    });
    final.status = this.config.deliveryStatus;
    if (action === 'add') {
      final.obj.toPrint = -1;
      final.obj.type = -1;
      final.status.unshift(this.config.choose);
      final.types.unshift(this.config.choose);
    } else if (action === 'update') {
      var idCheck = this.deliveries.findIndex((el) => { return el.id === this.selected});
      if (idCheck !== -1) {
        final.obj = this.deliveries[idCheck];
        if (final.obj.documentDate !== undefined) {
          let splitted = final.obj.documentDate.split('-');
          final.dateTime = {
            year: parseInt(splitted[0]),
            month: parseInt(splitted[1]),
            day: parseInt(splitted[2])
          };
        }
        final.title = this.config.deliveryTitle[1];
      }
    }
    const modalRef = this.modalService.open(DeliveryModal, { windowClass: 'current-modal' });
    modalRef.componentInstance.data = final;
    modalRef.result.then((refresh) => {
			if (refresh) {
        this.service.setClear();
				this.getDeliveries();
			}
	  }, (reason) => {
    });
  }

  refresh() {
    let curMessage = this.service.getMessage();
    this.displayMessage(curMessage.type, curMessage.message, 3000);
    this.getDeliveries();
  }
}
