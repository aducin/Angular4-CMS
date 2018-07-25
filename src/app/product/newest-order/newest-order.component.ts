import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NewestOrder } from '../../model/newestOrder';

@Component({
  selector: 'newest-order',
  templateUrl: './newest-order.component.html',
  styleUrls: ['./newest-order.component.css']
})
export class NewestOrderComponent implements OnInit {
  @Input() listNew: NewestOrder[];
  @Input() listOld: NewestOrder[];
  @Input() newest: {
    new: number,
    old: number,
  };
  @Input() newestSearch: boolean;
  @Input() url: string;
  @Output() deleteNewest = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  delete(db, id) {
    let curData = {
      db: db,
      id: id,
    };
    this.deleteNewest.emit(curData);
  }
}

