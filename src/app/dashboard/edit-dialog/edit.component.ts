import { Component, Output, Input, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { ContractService, IContract } from "../../services/contract.service";
import { HelperService } from "../../services/helper.service";
declare var jquery: any;
declare var $: any;
export interface IOptions {
  name: string;
  value: string;
}

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.less"]
})
export class EditComponent implements OnInit, AfterViewInit {
  public createdDate: string;
  @Input() document: IContract;
  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();


  public options: IOptions[] = [
    { name: "Contract", value: "contracts" }, 
    { name: "Insurance", value: "insurances" }, 
    { name: "Receipt", value: "receipts" }, 
    { name: "Other", value: "others" }
  ];

  constructor(
    private helperService: HelperService,
    private contractService: ContractService
  ) {}

  ngOnInit() {
    this.createdDate = this.helperService.convertToYMD(this.document.createdDate);
  }

  ngAfterViewInit() {
    $("#edit" + this.document.id).on("hidden.bs.modal", () => {
      this.closeModalEvent.emit();
    });
  }

  public saveDocument(): void {
    this.contractService.updateContract(this.document)
      .toPromise()
      .then(() => {
        this.refreshPage.emit();
      });
  }
}
