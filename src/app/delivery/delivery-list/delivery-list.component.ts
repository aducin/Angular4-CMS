import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Delivery } from '../../model/delivery';
import { DeliveryService } from '../../service/delivery.service';
import { MessageService } from '../../service/message.service';

import { Config } from '../../config';
import { Message } from '../../shared/functions';

import { Ng4FilesConfig, Ng4FilesSelected, Ng4FilesService, Ng4FilesStatus } from '../../../../node_modules/angular4-files-upload/src/app/ng4-files';

@Component({
  selector: 'delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  amountSuffix: string;
  loadingMessage: string;
  message: string;
  selected: number = 0;
  sortBy: string = 'id';
  sortReverse: boolean = true;
  token: string;
  type: string;
  url: string;

  @Input() deliveryList: Delivery[];
  @Input() amount:number;
  @Input() automatic:boolean;
  @Input() empty:boolean;
  @Input() loading:boolean;
  @Output() setSelected = new EventEmitter<number>();
  constructor(
    private config: Config,
    private messageService: MessageService,
    private ng4FilesService: Ng4FilesService,
    private service: DeliveryService
  ) { 
    this.loadingMessage = this.config.loading;
    this.url = this.config.serverPath + this.config.serverSuffix;
    this.token = localStorage.getItem('angular4Token');
  }

  public selectedFiles;
  private testConfig: Ng4FilesConfig = {
    acceptExtensions: ['doc', 'pdf'],
    maxFilesCount: 1,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.amount === 1) {
      this.amountSuffix = 'wynik';
    } else if (this.amount > 1 && this.amount < 5) {
      this.amountSuffix = 'wyniki';
    } else {
      this.amountSuffix = 'wyników';
    }
  }

  public filesUpload(selectedFiles: Ng4FilesSelected, id, documentNumber): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    var curLength = this.selectedFiles.length;
    if (curLength > this.testConfig.maxFilesCount) {
      return;
    }
    let obj = {
      documentNumber: documentNumber,
      id: id,
      file: selectedFiles.files,
      token: this.token,
    };
    this.service.addFile(obj)
    .subscribe( data => {
      this.message = data.reason;
			if (data.success) {
        this.type = 'success';
      } else {
        this.type = 'error';
      }
      this.messageService.setMessage( Message(this.type, this.message) );
      this.service.setInitialState();
		});
  }

  reSort(field) {
    if (field === this.sortBy) {
      this.sortReverse = !this.sortReverse;
    }
    this.sortBy = field;
  }

  setActive(id) {
    this.selected = this.selected !== id ? id : 0;
    this.setSelected.emit(this.selected);
  }
}
