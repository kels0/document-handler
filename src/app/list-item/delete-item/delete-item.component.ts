import { Component, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { DocumentService, IDocument } from "./../../services/document.service";
import { HelperService } from "./../../services/helper.service";
import { FileService } from "./../../services/file.service";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-delete-item",
  templateUrl: "./delete-item.component.html",
  styleUrls: ["./delete-item.component.less"]
})
export class DeleteItemComponent implements AfterViewInit {
  @Input() document: IDocument;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private documentService: DocumentService,
    private helperService: HelperService,
    private fileService: FileService
  ) {}

  ngAfterViewInit() {
    $("#delete" + this.document.id).on("hidden.bs.modal", () => {
      this.closeModalEvent.emit();
    });
  }

  public deleteDocument(): void {
    this.documentService.deleteContract(this.document.id)
      .toPromise()
      .then(() => {
        let fileNames = "";
        this.document.file.forEach((file) => {
          fileNames += file.filename + ",";
        });
        this.fileService.deleteFiles(fileNames).subscribe(() => {
          this.helperService.deleteDocument(this.document);
        });
      });
  }
}
