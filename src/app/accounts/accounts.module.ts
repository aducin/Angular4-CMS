import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard } from '../login.guard';
import { SharedModule } from '../shared/shared.module';
import { Config } from '../config';
import { AccountService } from '../service/account.service';
import { MessageService } from '../service/message.service';
import { AccountsComponent } from './accounts.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AccountListComponent } from './account-list/account-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { OrderModule } from 'ngx-order-pipe';

import { AccountModal } from '../modal/accountModal.component';

const accountsRoutes: Routes = [
  	{ 
  		path: 'accounts', 
  		canActivate: [ LoginGuard ], 
  		component: AccountsComponent
  	}
];

export const accountsRouting = RouterModule.forChild(accountsRoutes);

@NgModule({
	declarations: [
		AccountsComponent,
		AccountHeaderComponent,
		AccountListComponent,
		AccountModal
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		accountsRouting,
		SharedModule,
		NgbModule.forRoot(),
		LoadingModule,
		OrderModule
	],
	providers: [
		LoginGuard,
		Config,
		AccountService,
		MessageService
	],
	entryComponents: 
	[
    	AccountModal
  	],
	bootstrap: [AccountsComponent]
})
export class AccountsModule { }
