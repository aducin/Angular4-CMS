import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Printing } from '../../model/printing';
import { PrintingModal } from '../../modal/printingModal.component';

import { Ng4FilesConfig, Ng4FilesSelected, Ng4FilesService, Ng4FilesStatus } from '../../../../node_modules/angular4-files-upload/src/app/ng4-files';

@Component({
  selector: 'printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit {
  @Input() deliveryEmpty: boolean;
  @Input() deliveryList: any[];
  @Input() printing: Printing;
	@Input() printingEmpty: boolean;
  @Input() printingSearch: boolean;
  @Input() token: string;
	@Input() url: string;
  @Output() deleteRow = new EventEmitter<number>();
  @Output() refresh = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private ng4FilesService: Ng4FilesService,
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
  }

  delete(id) {
  	this.deleteRow.emit(id);
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
				this.refresh.emit();
			}
	  }, (reason) => {
	  });
  } 

}
