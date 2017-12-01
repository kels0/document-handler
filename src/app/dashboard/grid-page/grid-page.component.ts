import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { IDocument } from "../.././services/document.service";

@Component({
  selector: "app-grid-page",
  templateUrl: "./grid-page.component.html",
  styleUrls: ["./grid-page.component.less"]
})
export class ContractPageComponent {
  @Input() documents: IDocument[];

}
