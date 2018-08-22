import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DeliveryService } from '../service/delivery.service';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { TokenService } from '../service/token.service';
import { Config } from '../config';
import { Message, SplitDate } from '../shared/functions';
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
    private loginService: LoginService, 
    private messageService: MessageService,
    private modalService: NgbModal,
		private parserFormatter: NgbDateParserFormatter,
    private router: Router,
    private service: DeliveryService,
    private tokenService: TokenService
  ) {
    this.deliveryTypes = this.config.deliveryTypes;
    this.status = this.config.deliveryStatus;
    this.token = this.tokenService.getToken();
		this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
		this.service.loading.subscribe(() => this.loading = true);
    this.service.refresh.subscribe(() => this.getDeliveries());
    this.service.result.subscribe((data) => this.handleData(data));
  }

  ngOnInit() { this.getDeliveries() }

  getDeliveries() {
    this.service.getDeliveries()
		.subscribe((result) => this.handleData(result));
  }

  handleData(data) {
    this.success = data.success;
		this.empty = Boolean(data.empty);
    this.loading = false;
    if (this.success && !this.empty) {
      this.deliveries = this.service.removeNullFromNumbers(data.list);
      this.amount = data.list.length;
    }
  }

  handleSelected(id) {
    if (id === -1) {
        this.selected = 0;
        this.messageService.setMessage( Message('error', this.config.accountClosed) );
    } else {
        this.selected = this.selected !== id ? id : 0;
    }
  }

  logOut() {
		this.messageService.setMessage( Message('success', this.config.loggedOut, 'logOut', 'loginService') );
	}

	messageDisplay(data) {
		this.messageShow = data.display;
		this.messageType = data.type;
  	this.messageValue = data.value;
	}
  
  open(action) {
    let final = {
      action,
      dateTime: undefined,
      obj: <Delivery>{},
      status: this.config.deliveryStatus,
      title: undefined,
      token: this.token,
      types: [],
    };
    this.deliveryTypes.forEach((el) => {
      if (el.id !== -1) {
        final.types.push(el);
        final.title = this.config.deliveryTitle[0];
      }
    });
    if (action === 'add') {
      final.obj.toPrint = -1;
      final.obj.type = -1;
      final.status.unshift(this.config.choose);
      final.types.unshift(this.config.choose);
    } else if (action === 'update') {
      var idCheck = this.deliveries.findIndex((el) => { return el.id === this.selected});
      if (idCheck !== -1) {
        final.obj = this.deliveries[idCheck];
        final.title = this.config.deliveryTitle[1];
        if (final.obj.documentDate !== undefined) {
            final.dateTime = SplitDate(final.obj.documentDate);
        }
      }
    }
    const modalRef = this.modalService.open(DeliveryModal, { windowClass: 'current-modal' });
    modalRef.componentInstance.data = final;
    modalRef.result.then((refresh) => {
			if (refresh) {
				this.getDeliveries();
			}
	  }, (reason) => {
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
}
