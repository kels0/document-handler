import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { IDocument } from "./../services/document.service"
import { HelperService } from "../services/helper.service";
import { FileService } from "../services/file.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.less"]
})
export class ListItemComponent implements OnInit, AfterViewInit {
  public createdDate: string;
  public file: SafeUrl;
  @Input() index: number;
  @Input() document: IDocument;

  constructor(
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
    private fileService: FileService
  ) { }

  ngAfterViewInit() {
    $("[data-toggle=popover]", "#" + this.document.id).popover({
        html: true,
        trigger: "hover",
        content: () => {
          const url =
            `<img class="img-fluid" src="${this.file[Object.keys(this.file)[0]]}" width="150" height="150"/>`;
          return url;
        }
      });
  }

  ngOnInit() {
    this.createdDate = this.helperService.convertToYMD(this.document.createdDate);
    this.getImage();
  }

  private getImage(): void {
    const fileName = this.document.file[0].filename; // preview only first image
    this.fileService.getFile(fileName).subscribe((file) => {
      this.file = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file.blob()));
    });
  }
}
