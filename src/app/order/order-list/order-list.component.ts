import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../service/message.service';
import { OrderService } from '../../service/order.service';

import { OrderDetails, Discount } from '../../model/orderDetails';
import { OrderRow, OrderModifiedRow } from '../../model/orderRow';
import { Customer } from '../../model/customer';
import { Message } from '../../shared/functions';
import { Voucher } from '../../model/voucher';

import { Config } from '../../config';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  action: string = 'order';
  cardDetails: OrderRow[];
  evenDetails: OrderModifiedRow[];
  customer: Customer;
  customerId: number;
  discount: Discount;
  db: string;
  dbName: string;
  dbShortcut: string[];
  deliveryNumber: boolean = false;
  empty:boolean;
  id: number;
  lastVoucher: number;
  messageShow: boolean = false;
  messageType: string;
  messageValue: string;
  number: string = '(00)';
  orderDetails: OrderDetails;
  searching: boolean = false;
  serverPath: string;
  token: string;
  tooShort: boolean = true;
  voucher: Voucher[];

  constructor(
    private config: Config, 
    private route: ActivatedRoute, 
    private router: Router, 
    private messageService: MessageService,
    private service: OrderService,
    private tokenService: TokenService
  ) {
    this.serverPath = this.config.serverPath;
    this.token = this.tokenService.getToken();
    this.service.loading.subscribe(() => this.searching = true);
    this.service.loadingFinished.subscribe(() => this.searching = false);
  }

  ngOnInit() {}

  ngDoCheck() {
    if (this.route.snapshot.params.db && this.route.snapshot.params.id) {
      this.db = this.route.snapshot.params.db;
      this.dbName = this.db === 'old' ? 'Stary panel' : 'Nowy panel';
      this.dbShortcut = this.db === 'old' ? ['SP', 'NP'] : ['NP', 'SP'];
      if (this.id === undefined || this.route.snapshot.params.id !== this.id) {
        this.id = this.route.snapshot.params.id;
        let curLength = this.route.snapshot.url.length;
        if (curLength === 3) {
          if (this.route.snapshot.url[2].path === 'even') {
            this.action = 'even';
          } else if (this.route.snapshot.url[2].path === 'discount') {
            this.action = 'discount';
          } else if (this.route.snapshot.url[2].path === 'mail') {
            this.action = 'mail';
          } else if (this.route.snapshot.url[2].path === 'voucher') {
            this.action = 'voucher';
          }
        }
        if (this.action === 'discount' || this.action === 'mail' || this.action === 'order') {
          this.searchOrder();
        } else if (this.action === 'even') {
          this.evenOrder();
        } else if (this.action === 'voucher') {
          this.checkVouchers();
        }
      }
    }
  }

  checkVouchers() {
    this.service.getOrder(this.db, this.id, 'basic')
        .subscribe( data => {
          if (data.success === false) {
            this.handleFailure(data);
          } else {
            this.customerId = data.customer.id;
            this.service.checkVouchers(this.customerId)
                .subscribe( data => {
                  if (data.success === false) {
                    this.handleFailure(data);
                  } else {
                    this.searching = false;
                    this.customer = data.customer;
                    this.voucher = data.data;
                    this.lastVoucher = data.lastVoucher;
                    if (this.lastVoucher === 0) {
                      this.messageService.setMessage( Message('error', this.config.emptyVoucher) );
                    }
                  }
                });
          }
        });
  }

  evenOrder() {
    this.service.evenOrder(this.db, this.id)
        .subscribe( data => {
          this.searching = false;
          if (data[0]) {
            this.empty = false;
            this.evenDetails = data;
          } else {
            this.handleFailure(data);
          }
        });
  }

  handleFailure(data) {
    this.messageService.setMessage( Message('error', data.reason) );
  }

  goBack() {
    this.router.navigate(['orders'])
  }

  searchOrder() {
    setTimeout(() => {
      if (this.action === 'discount') {
        var action = this.service.getOrder(this.db, this.id, 'discount');
      } else {
        var action = this.service.getOrder(this.db, this.id, this.token);
      }
      action.subscribe( data => {
            this.searching = false;
            if (data.success === false) {
              this.handleFailure(data);
            } else {
              this.empty = false;
              this.customer = data.customer;
              let curDetails = {
                payment: data.payment,
                reference: data.reference,
                totalPaid: parseFloat(data.totalPaid),
                totalProduct: parseFloat(data.totalProduct),
                totalShipment: parseFloat(data.totalShipment),
              };
              this.orderDetails = curDetails;
              this.cardDetails = data.cartDetails;
              if (this.action === 'discount') {
                this.discount = {
                  discountExtended: data.discountExtended,
                  totalPaid: data.totalPaid,
                  totalPaidDiscount: data.totalPaidDiscount,
                  totalProduct: data.totalProduct,
                  totalProductDiscount: data.totalProductDiscount,
                };
              }
            }
          });
    }, 1000);
  }

  numberLength() {
    let curLength = this.number.length;
    this.tooShort = curLength < 12;
  }

  setEdition(id) {
    let url = 'products/edition/' + id;
    this.router.navigate([url]);
  }

  send(action) {
    if (action === 'mail') {
      action = 'undelivered';
    }
    var params = {
      result: 'send',
      action: action,
      deliveryNumber: this.number,
      voucher: this.lastVoucher,
    };
    let curObj = {
      db: this.db,
      id: this.id,
      params: params,
      token: this.token
    };
    this.service.sendMail(curObj);
  }

  setNumber() {
    this.deliveryNumber = !this.deliveryNumber;
  }

  setOrder(final) {
    var url = 'orders/' + this.db + '/' + this.id;
    if (final) {
      url = url + '/' + final;
    }
    this.router.navigate([url]);
  }
}
