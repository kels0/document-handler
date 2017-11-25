import { Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { IDocument } from "./../services/document.service"
import { HelperService } from "../services/helper.service";
import { FileService } from "../services/file.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.less"]
})
export class ListItemComponent implements OnInit {
  public showPreview: boolean;
  public showEdit = false;
  public showDelete = false;
  public createdDate: string;
  public file: any;
  @Input() document: IDocument;

  constructor(
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.createdDate = this.helperService.convertToYMD(this.document.createdDate);
    if (this.document.file.length > 0) {
      const fileName = this.document.file[0].filename;
      this.fileService.getFile(fileName).subscribe((file) => {
        this.file = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file.blob()));
      });
    }
  }

  public toggleModal(): void {
    setTimeout(() => {
      this.showPreview = !this.showPreview;
    }, 100);
  }
}
