import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Printing } from '../../model/printing';
import { PrintingModal } from '../../modal/printingModal.component';
import { Message } from '../../shared/functions';
import { MessageService } from '../../service/message.service';
import { ProductService } from '../../service/product.service';

import { Ng4FilesConfig, Ng4FilesSelected, Ng4FilesService, Ng4FilesStatus } from '../../../../node_modules/angular4-files-upload/src/app/ng4-files';

@Component({
  selector: 'printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit {
  deliveryEmpty: boolean;
  deliveryList: any[];
  empty: boolean = true;
  list: any[];
  searching: boolean = true;
  @Input() token: string;
	@Input() url: string;

  constructor(
    private messageService: MessageService,
    private modalService: NgbModal,
    private ng4FilesService: Ng4FilesService,
    private service: ProductService
  ) { }

  public selectedFiles;
  private testConfig: Ng4FilesConfig = {
    acceptExtensions: ['doc', 'pdf'],
    maxFilesCount: 1,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };

  ngOnInit() {
    this.ng4FilesService.addConfig(this.testConfig);
    this.getData();
  }

  delete(id) {
  	this.service.deleteAdditional('printing', id)
		.subscribe( data => {
			let curType = data.success !== false ? 'success' : 'error';
			this.messageService.setMessage( Message(curType, data.reason) );
			this.getData();
		});
  }

  getData() {
    this.searching = true;
    let result = this.service.getPrinting()
    .subscribe(data => {
			if (data.success && data.empty) {
				this.empty = true;
			} else if (data.success && !data.empty) {
				this.empty = false;
				this.list = data.list;
			}
			this.deliveryEmpty = data.emptyDelivery;
			this.deliveryList = data.deliveryList;
			this.searching = false;
		});
  }

  public filesUpload(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }
    // Handle error statuses here
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    var curLength = this.selectedFiles.length;
    if (curLength > this.testConfig.maxFilesCount) {
      console.log('too many files');
      return;
    }
    let obj = {
      file: selectedFiles.files,
      token: this.token,
    };
    const modalRef = this.modalService.open(PrintingModal, { windowClass: 'current-modal' });
    modalRef.componentInstance.data = obj;
    modalRef.result.then((refresh) => {
			if (refresh) {
				this.getData();
			}
	  }, (reason) => {
	  });
  } 

}
