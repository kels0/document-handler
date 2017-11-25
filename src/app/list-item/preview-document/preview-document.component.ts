import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { IDocument } from "../../services/document.service";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-preview-document",
  templateUrl: "./preview-document.component.html",
  styleUrls: ["./preview-document.component.less"]
})
export class PreviewDocumentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() document: IDocument;
  @Input() file: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  public fileName: string;

  ngOnInit() {
    if (this.document) {
      this.fileName = this.document.file[0].originalname;
    }
  }
  ngAfterViewInit() {
    $("#view" + this.document.id).on("hidden.bs.modal", () => {
      this.closeModalEvent.emit();
    });
  }

  ngOnDestroy(): void {
    this.closeModalEvent.unsubscribe();
  }
}
