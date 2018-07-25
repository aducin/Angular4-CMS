import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Postal } from '../model/postal';
import { PostalService } from '../service/postal.service';
import { LoginService } from '../service/login.service';
import { MainData } from '../mainData';

import { PostalModal } from '../modal/postal.modal.component';

@Component({
  	selector: 'app-postal',
  	templateUrl: './postal.component.html',
    styleUrls: ['./postal.component.css'],
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
export class PostalComponent implements OnInit {

  amount: number;
  list: Postal[];
  loading: boolean;
  messageShow: boolean = false;
  messageType: string;
  messageValue: string;
  token: string;
	constructor(
        private loginService: LoginService,
        private mainData: MainData,
        private modalService: NgbModal,
        private router: Router,
        private service: PostalService
    ) {}

  ngOnInit() {
    //this.token = JSON.parse(localStorage.getItem('angular4Token'));
      this.token = localStorage.getItem('angular4Token');
  	this.getPostal();
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

  getPostal() {
    this.loading = true;
    this.service.getList(this.token)
    .subscribe( data => {
        if (data.success) {
            this.list = data.list;
            this.amount = data.current;
            this.loading = false;
        } else {
            this.messageShow = true;
            this.messageType = 'error';
            this.messageValue = data.reason;
            setTimeout(() => {
                this.router.navigate(['../login']);
            }, 3000);
        }
    });
  }

  logOut() {
		this.displayMessage('success', this.mainData.loggedOut, 3000, 'loginService', 'logOut');
	}

  open(action) {
    let data = {
      action: <string>action,
      amount: <number>this.amount,
      amountOriginal: <number>this.amount,
      error: <boolean>false,
      message: <string>'',
      newAmount: <number>0,
      saveAllow: <boolean>false,
      success: <boolean>false,
      token: this.token,
      title: action === 'add' ? this.mainData.postalActions[0] : this.mainData.postalActions[1],
    };
    const modalRef = this.modalService.open(PostalModal, { windowClass: 'current-modal' });
    modalRef.componentInstance.data = data;
    modalRef.result.then((refresh) => {
      if (refresh) {
        this.getPostal();
      }
    }, (reason) => {
    });
  }
}
