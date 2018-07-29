import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { TokenService } from '../service/token.service';
import { Account, Totals } from '../model/account';
import { AccountSummary } from '../model/accountSummary';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountModal } from '../modal/accountModal.component';
import { Config } from '../config';
import { CheckEmpty, Message, SplitDate } from '../shared/functions';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css'],
	encapsulation: ViewEncapsulation.None,
	styles: [`
		.current-modal { position: fixed; top: 5% }
		.modal-content { width: 120% }`
  	]
})
export class AccountsComponent implements OnInit {
	amount: number;
	automatic: boolean;
	empty: boolean = false;
	list: Account[];
	loading: boolean;
	messageShow: boolean = false;
	messageType: string;
	messageValue:string;
	selected: number = 0;
	self: string = 'accounts';
	success: boolean;
	toCount: string[] = ['locs', 'coach', 'element', 'accessories', 'book', 'car'];
	totals = Totals;
	constructor(
		private config: Config,
		private cookieService: CookieService,
		private loginService: LoginService,
		private messageService: MessageService,
		private modalService: NgbModal,
		private router: Router,
		private service: AccountService,
		private tokenService: TokenService
	) {
		this.messageService.display.subscribe((data) => this.messageDisplay(data));
		this.messageService.postAction.subscribe((data) => this.postMessageAction(data));
		this.service.dataEmitter.subscribe((observable) => {
			observable.subscribe((data => this.handleData(data)));
		});
	}

 	ngOnInit() { 
		 this.service.setInitialState(); 
		}

	handleData(data) {
		this.success = data.success;
        this.loading = false;
		if (data.success) {
			this.empty = Boolean(data.empty);
			if (!data.empty) {
				this.config.accountList.forEach( el => this[el] = data[el] );
			}
		} else {
			this.messageService.setMessage( Message('error', data.reason, 'router', 'navigate') );
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
        let data = {
            action,
            obj:<Account>{},
            saveAllow: false,
            state: this.config.accountState,
			title: undefined,
			token: this.tokenService.getToken(),
            type: this.config.accountType,
            cashTime: undefined,
            receiptTime: undefined
        };
		data.title = action === 'add' ? this.config.accountTitle[0] : this.config.accountTitle[1];
        if (action === 'add') {
            data.obj.closed = -1;
            data.obj.type = -1;
			if (CheckEmpty(data.state) === -1) {
				data.state.unshift(this.config.choose);	
			}
            if (CheckEmpty(data.type) === -1) {
				data.type.unshift(this.config.choose);
			}
        } else {
            var check = this.list.findIndex( el => el.id === this.selected );
            if (check !== -1) {
                data.obj = this.list[check];
                if (data.obj.cashTime !== undefined) {
                    data.cashTime = SplitDate(data.obj.cashTime);
                }
                if (data.obj.receiptTime !== undefined) {
					data.cashTime = SplitDate(data.obj.receiptTime);
                }
            }
        }
		const modalRef = this.modalService.open(AccountModal, { windowClass: 'current-modal' });
		modalRef.componentInstance.data = data;
		modalRef.result.then((refresh) => {
			if (refresh) {
				this.service.setInitialState();
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
