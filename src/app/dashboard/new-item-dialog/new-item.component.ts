import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
import { ContractService, IContract, IFile } from "../../services/contract.service";
import { FileService } from "../../services/file.service";
import { HelperService } from "../../services/helper.service";
declare var jquery: any;
declare var $: any;

export interface IOption {
  name: string;
  value: string;
}

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
  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();

  public options: IOption[] = [
    { name: "Contract", value: "contracts" },
    { name: "Insurance", value: "insurances" },
    { name: "Receipt", value: "receipts" },
    { name: "Other", value: "others" }
  ];

  constructor(
    private helperService: HelperService,
    private contractService: ContractService,
    private fileService: FileService
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

    const document: IContract = {
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

  private saveContract(document: IContract): void {
    this.contractService.addContract(document)
      .toPromise()
      .then(() => {
        this.refreshPage.emit();
      });
  }
}
