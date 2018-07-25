import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../../service/order.service';

import { OrderDetails } from '../../model/orderDetails';
import { OrderRow } from '../../model/orderRow';
import { Customer } from '../../model/customer';

import { Config } from '../../config';

@Component({
  selector: 'order-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  cardDetails: OrderRow[];
  customer: Customer;
  db: string;
  empty:boolean;
  id: number;
  messageShow: boolean = false;
  messageType: string;
  messageValue: string;
  orderDetails: OrderDetails;
  searching: boolean = false;
  token: string;

  constructor(private config: Config, private route: ActivatedRoute, private router: Router, private service: OrderService) { 
    this.token = JSON.parse(localStorage.getItem('angular4Token'));
  }

  ngOnInit() {
    if (this.route.snapshot.params.db === undefined && this.route.snapshot.params.id === undefined) {
      console.log('time to sleep');
      return false;
    }
    console.log('inside details');
    console.log(this.route.snapshot.params);
    this.db = this.route.snapshot.params.db;
    if (this.id === undefined || this.route.snapshot.params.id !== this.id) {
      this.id = this.route.snapshot.params.id;
      this.searchOrder();
    }
  }

  searchOrder() {
    this.searching = true;
    setTimeout(() => { 
      this.service.getOrder(this.db, this.id, this.token)
      .subscribe( data => {
        this.searching = false;
        if (data.success === false) {
          if (data.reason === "Token niepoprawny - u\u017cytkownik niezalogowany!") {
            this.messageShow = true;
            this.messageType = 'error';
            this.messageValue = data.reason;
            setTimeout(() => {
              this.router.navigate(['../login']);
            }, 3000);
          } else {
            this.empty = true;
          }
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
        }
      });
    }, 1000);
  }
}
