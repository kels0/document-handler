import { Component, Output, Input, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { DocumentService, IDocument } from "../../services/document.service";
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
  public editingDocument: IDocument;
  @Input() document: IDocument;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  public options: IOptions[] = [
    { name: "Contract", value: "contracts" },
    { name: "Insurance", value: "insurances" },
    { name: "Receipt", value: "receipts" },
    { name: "Other", value: "others" }
  ];

  constructor(
    private helperService: HelperService,
    private documentService: DocumentService
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
