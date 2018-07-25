import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'ngx-loading';

import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';

import { ActiveDirective } from '../directives/active.directive';
import { PointerDirective } from '../directives/pointer.directive';

@NgModule({
  imports: 
  [
    CommonModule,
    LoadingModule,
    RouterModule
  ],
  declarations: 
  [
    HeaderComponent,
    MessageComponent,
    ActiveDirective,
    PointerDirective
  ],
  exports: 
  [ 
    HeaderComponent,
    LoadingModule,
    MessageComponent,
    ActiveDirective,
    PointerDirective
    
  ]
})
export class SharedModule { }
