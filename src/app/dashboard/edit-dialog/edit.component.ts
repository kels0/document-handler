import { Component, Output, Input, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { DocumentService, IDocument } from "../../services/document.service";
import { HelperService } from "../../services/helper.service";
import { Constants } from "../.././constants";

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
  public editingDocument: IDocument;
  @Input() document: IDocument;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  public options: IOptions[] = [
    { name: "Contract", value: this.constans.CONTRACTS },
    { name: "Insurance", value: this.constans.INSURANCES },
    { name: "Receipt", value: this.constans.RECEIPTS },
    { name: "Other", value: this.constans.OTHER }
  ];

  constructor(
    private helperService: HelperService,
    private documentService: DocumentService,
    private constans: Constants
  ) {}

  ngOnInit() {
    this.createdDate = this.helperService.convertToYMD(this.document.createdDate);
    this.editingDocument = { ...this.document };
  }

  ngAfterViewInit() {
    $("#edit" + this.document.id).on("hidden.bs.modal", () => {
      this.closeModalEvent.emit();
    });
  }

  public resetDocument(): void {
    this.editingDocument = this.document;
  }

  public saveDocument(): void {
    this.documentService.updateContract(this.editingDocument)
      .toPromise()
      .then(() => {
        this.helperService.updatePage(this.editingDocument);
      });
  }
}
