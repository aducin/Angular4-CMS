import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Postal } from '../model/postal';
import { PostalModal } from '../modal/postal.modal.component';
import { PostalService } from '../service/postal.service';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { TokenService } from '../service/token.service';
import { Config } from '../config';
import { Message } from '../shared/functions';

@Component({
  	selector: 'app-postal',
  	templateUrl: './postal.component.html',
    styleUrls: ['./postal.component.css'],
    encapsulation: ViewEncapsulation.None,
    styles: [`data
      .current-modal { position: fixed; top: 10% }
      .modal-content { width: 120% }`
    ]
})
export class PostalComponent implements OnInit {

  amount: number;
  list: Postal[];
  loading: boolean;
  messageShow: boolean = false;
  messageType: string;
  messageValue: string;
  self: string = 'postal';
  token: string;
	constructor(
    private loginService: LoginService,
    private config: Config,
    private messageService: MessageService,
    private modalService: NgbModal,
    private router: Router,
    private service: PostalService,
    private tokenService: TokenService
  ) {
    this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
    this.service.loading.subscribe( () => this.loading = true );
    this.service.dataEmitter
      .switchMap(observable => observable)
      .subscribe((data) => this.handleData(data));
    }

  ngOnInit() { this.service.getList() }
/*
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
*/
  handleData(data) {
    this.loading = false;
    if (data.success) {
      this.list = data.list;
      this.amount = data.current;
    } else {
      this.messageService.setMessage( Message('error', data.reason, 'router', 'navigate') );
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
    let data = {
      action,
      amount: this.amount,
      amountOriginal: this.amount,
      error: false,
      message: undefined,
      newAmount: 0,
      saveAllow: false,
      success: false,
      token: this.tokenService.getToken(),
      title: action === 'add' ? this.config.postalActions[0] : this.config.postalActions[1]
    };
    const modalRef = this.modalService.open(PostalModal, { windowClass: 'current-modal' });
    modalRef.componentInstance.data = data;
    modalRef.result.then((refresh) => {
      if (refresh) {
        this.service.getList();
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
