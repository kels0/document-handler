import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ContractService, IContract, IFile } from "../../services/contract.service";
import { FileService } from "../../services/file.service";
import { HelperService } from "../../services/helper.service";
declare var jquery: any;
declare var $: any;

export interface IOptions {
  name: string;
  value: string;
}

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.less']
})
export class NewItemComponent implements OnInit {
  public name: string;
  public fileName: string;
  public description: string;
  public type: string;
  public file: any;
  public filesToUpload: Array<File> = [];
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  public options: IOptions[] = [
    { name: "Contract", value: "contracts" }, 
    { name: "Insurance", value: "insurances" }, 
    { name: "Receipt", value: "receipts" }, 
    { name: "Other", value: "others" }
  ];

  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private contractService: ContractService,
    private fileService: FileService
  ) {
  }

  ngOnInit() {
    $("input[type=file]").change((event) => {
      const files = event.target.files;
      this.filesToUpload = files;
      this.fileName = files[0].name;
    });
  }

  public saveDocument(): void {
    const formData: FormData = new FormData();
    const files = this.filesToUpload;
    for(let i = 0; i < files.length; i++){
      formData.append("file", files[i], files[i]['name']);
    }

    const document: IContract = {
      id: this.helperService.generateId(),
      type: this.type,
      name: this.name,
      description: this.description,
      file: null,
      createdDate: this.helperService.getDate()
    };
    this.fileService.uploadFile(formData).subscribe((files) => {
      document.file = files.json().data;
      this.saveContract(document);    
    });
  }

  public closeModal(): void {
    this.closeModalEvent.emit();
  }

  private saveContract(document: IContract): void {
    this.contractService.addContract(document)
      .toPromise()
      .then(() => {
        this.closeModal();
        this.refreshPage.emit();
      });
  }
}
