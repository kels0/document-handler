import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IDocument } from "../.././services/document.service";
import { ReceiptsService } from "../.././services/receipts.service";
import { HelperService } from "../.././services/helper.service";

@Component({
  selector: "app-receipts-page",
  templateUrl: "./receipts-page.component.html",
  styleUrls: ["./receipts-page.component.less"]
})
export class ReceiptsPageComponent implements OnInit {

  @Input() documents: IDocument[];
  constructor(
    private receiptsService: ReceiptsService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getReceipts();
    this.helperService.currentType.subscribe((document) => {
      if (document && this.documents && document.type === "receipts") {
        this.getReceipts();
      }
    });
  }

  private getReceipts(): void {
    this.receiptsService.getAllReceipts()
    .subscribe((receipts) => {
      this.documents = receipts.json()
    });
  }
}
