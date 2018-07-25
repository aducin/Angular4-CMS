import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LoginGuard } from '../login.guard';

import { SharedModule } from '../shared/shared.module';
import { MainData } from '../mainData';
import { PostalService } from '../service/postal.service';
import { PostalComponent } from './postal.component';
import { ListComponent } from './list/list.component';
import { PostalModal } from '../modal/postal.modal.component';
import { LoadingModule } from 'ngx-loading';

import 'rxjs/add/operator/map';

const postalRoutes: Routes = [
	{ 
		path: 'postal',
		canActivate: [ LoginGuard ],  
		component: PostalComponent
	}
];

export const postalRouting = RouterModule.forChild(postalRoutes);

@NgModule({
	declarations: [
		PostalComponent,
		ListComponent,
		PostalModal
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		postalRouting,
		SharedModule,
		LoadingModule
	],
	providers: [
		LoginGuard,
		MainData,
		PostalService
	],
	bootstrap: [
		PostalComponent
	],
	entryComponents: [
    	PostalModal
  	],
})
export class PostalModule { }
