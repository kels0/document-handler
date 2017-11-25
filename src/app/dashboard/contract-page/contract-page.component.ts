import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IDocument } from "../.././services/document.service";
import { ContractService } from "../.././services/contract.service";
import { HelperService } from "../.././services/helper.service";
import { Constants } from "../.././constants";

@Component({
  selector: "app-contract-page",
  templateUrl: "./contract-page.component.html",
  styleUrls: ["./contract-page.component.less"]
})
export class ContractPageComponent implements OnInit {
  public documents: IDocument[];
  // @Output() refreshData: EventEmitter<{}> = new EventEmitter();
  constructor(
    private contractService: ContractService,
    private helperService: HelperService,
    private constants: Constants
  ) { }

  ngOnInit() {
    this.getContracts();
    this.helperService.currentType.subscribe((document) => {
      if (document && this.documents && document.type === this.constants.CONTRACTS) {
        this.getContracts();
      }
    });
  }

  private getContracts(): void {
    this.contractService.getAllContracts()
    .subscribe((contracts) => {
        this.documents = contracts.json()
    });
  }
}
