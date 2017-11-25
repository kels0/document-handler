import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IDocument } from "../.././services/document.service";
import { InsuranceService } from "../.././services/insurance.service";
import { HelperService } from "../.././services/helper.service";

@Component({
  selector: "app-insurance-page",
  templateUrl: "./insurance-page.component.html",
  styleUrls: ["./insurance-page.component.less"]
})
export class InsurancePageComponent implements OnInit {

  @Input() documents: IDocument[];
  constructor(
    private insuranceService: InsuranceService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getInsurances();
    this.helperService.currentType.subscribe((document) => {
      if (document && this.documents && document.type === "insurances") {
        this.getInsurances();
      }
    });
  }

  private getInsurances(): void {
    this.insuranceService.getAllInsurances()
    .subscribe((insurances) => {
      this.documents = insurances.json()
    });
  }
}
