import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../../service/order.service';

import { OrderDetails, Discount } from '../../model/orderDetails';
import { OrderRow, OrderModifiedRow } from '../../model/orderRow';
import { Customer } from '../../model/customer';
import { Voucher } from '../../model/voucher';

import { Config } from '../../config';

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
    private service: OrderService
  ) {}

  ngOnInit() {
    this.serverPath = this.config.serverPath;
    this.token = localStorage.getItem('angular4Token');
  }

  ngDoCheck() {
    if (this.route.snapshot.params.db === undefined && this.route.snapshot.params.id === undefined) {
      return false;
    } else {
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
    this.searching = true;
    this.service.getOrder(this.db, this.id, this.token, 'basic')
        .subscribe( data => {
          if (data.success === false) {
            this.handleFailure(data);
          } else {
            this.customerId = data.customer.id;
            this.service.checkVouchers(this.customerId, this.token)
                .subscribe( data => {
                  if (data.success === false) {
                    this.handleFailure(data);
                  } else {
                    this.searching = false;
                    this.customer = data.customer;
                    this.voucher = data.data;
                    this.lastVoucher = data.lastVoucher;
                    if (this.lastVoucher === 0) {
                      this.service.setMessage({
                        type: 'error',
                        text: this.config.emptyVoucher,
                      });
                    }
                  }
                });
          }
        });
  }

  evenOrder() {
    this.searching = true;
    this.service.evenOrder(this.db, this.id, this.token)
        .subscribe( data => {
          this.searching = false;
          if (!data.success) {
            this.handleFailure(data);
          } else {
            this.empty = false;
            this.evenDetails = data;
          }
        });
  }

  handleFailure(data) {
    this.service.setFailure(data);
  }

  goBack() {
    this.router.navigate(['orders'])
  }

  searchOrder() {
    this.searching = true;
    setTimeout(() => {
      if (this.action === 'discount') {
        var action = this.service.getOrder(this.db, this.id, this.token, 'discount');
      } else {
        var action = this.service.getOrder(this.db, this.id, this.token);
      }
      action
          .subscribe( data => {
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
      token: this.token,
    };
    this.service.setRequest(curObj);
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
