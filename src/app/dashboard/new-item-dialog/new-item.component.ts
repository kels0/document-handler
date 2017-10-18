import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ContractService, IContract } from "../../services/contract.service";
import { HelperService } from "../../services/helper.service";

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
  public description: string;
  public type: string;
  public fileLocation: string;

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
    private contractService: ContractService
  ) { 
  }

  ngOnInit() {
    this.type = this.options[0].value;
  }

  public saveDocument(): void {
    const document: IContract = {
      id: this.helperService.generateId(),
      type: this.type,
      name: this.name,
      description: this.description,
      fileLocation: this.fileLocation,
      createdDate: ""
    };
    this.contractService.addContract(document)
      .toPromise()
      .then(() => {
        this.refreshPage.emit();
      });
  }
}
