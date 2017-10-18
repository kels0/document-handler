import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ContractService, IContract } from "../../services/contract.service";
import { HelperService } from "../../services/helper.service";

export interface IOptions {
  name: string;
  value: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  public name: string;
  public description: string;
  public type: string;
  public fileLocation: string;
  public createdData: string;
  @Input() document: IContract;
  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();

  public options: IOptions[] = [
    { name: "Contract", value: "contracts" }, 
    { name: "Insurance", value: "insurances" }, 
    { name: "Receipt", value: "receipts" }, 
    { name: "Other", value: "others" }
  ];

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private contractService: ContractService
  ) { 
  }

  ngOnInit() {
  }

  public saveDocument(): void {
    this.contractService.updateContract(this.document)
      .toPromise()
      .then(() => {
        this.refreshPage.emit();
      });
  }

  public cancel(): void {
    this.refreshPage.emit();
  }
}
