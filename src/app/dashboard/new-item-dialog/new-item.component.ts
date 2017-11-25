import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
import { DocumentService, IDocument, IOption } from "../../services/document.service";
import { FileService, IFile } from "../../services/file.service";
import { HelperService } from "../../services/helper.service";
import { Constants } from "../.././constants";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-new-item",
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.less"]
})
export class NewItemComponent implements OnInit {
  public name: string;
  public fileName: string;
  public description: string;
  public type: string;
  public filesToUpload: Array<File> = [];
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  public options: IOption[] = [
    { name: "Contract", value: this.constants.CONTRACTS },
    { name: "Insurance", value: this.constants.INSURANCES },
    { name: "Receipt", value: this.constants.RECEIPTS },
    { name: "Other", value: this.constants.OTHER }
  ];

  constructor(
    private helperService: HelperService,
    private documentService: DocumentService,
    private fileService: FileService,
    private constants: Constants
  ) {
    this.type = this.options[0].value;
  }

  ngOnInit() {
    $("input[type=file]").change((event) => {
      const files = event.target.files;
      this.filesToUpload = files;
      this.fileName = files[0].name;
    });

    $("#addNewModal").on("hidden.bs.modal", () => {
      this.closeModalEvent.emit();
    });
  }

  public saveDocument(): void {
    const formData: FormData = new FormData();
    const files = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i], files[i]["name"]);
    }

    const document: IDocument = {
      id: this.helperService.generateId(),
      type: this.type,
      name: this.name,
      description: this.description,
      file: null,
      createdDate: this.helperService.getDate()
    };
    this.fileService.uploadFile(formData).subscribe((files) => {
      document.file = files.json().data;
      this.saveContract(document);
    });
  }

  private saveContract(document: IDocument): void {
    this.documentService.addContract(document)
      .toPromise()
      .then(() => {
        this.helperService.updatePage(document);
      });
  }
}
