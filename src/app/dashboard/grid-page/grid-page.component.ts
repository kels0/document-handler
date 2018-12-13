import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { IDocument } from "../.././services/document.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-grid-page",
  templateUrl: "./grid-page.component.html",
  styleUrls: ["./grid-page.component.less"]
})
export class GridPageComponent {

  public selectedDocument: IDocument;
  public documentId = "";
  @Input() documents: IDocument[];


  public refreshGrid(): void {
    this.selectedDocument = null;
    this.documentId = "";
  }

  public selectItem(document: IDocument): void {
    $(".selected.row-item").removeClass("selected");
    $("#" + document.id).addClass("selected");

    this.documentId = document.id;
    this.selectedDocument = document;
  }

}


