import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { FileService, IFile } from "../../services/file.service";
import { IDocument } from "../../services/document.service";
import { DomSanitizer } from "@angular/platform-browser";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-preview-document",
  templateUrl: "./preview-document.component.html",
  styleUrls: ["./preview-document.component.less"]
})
export class PreviewDocumentComponent implements OnInit, AfterViewInit {
  @Input() document: IDocument;
  @Input() file: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  public images: any;
  public files: IFile[];

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    if (this.document) {
      this.files = this.document.file;
      this.getImages();
    }
  }
  ngAfterViewInit() {
    $("#view" + this.document.id).on("hidden.bs.modal", () => {
      this.closeModalEvent.emit();
    });
  }

  public openFile(fileName: string): void {
    this.fileService.getFile(fileName).subscribe((file) => {
      const url = URL.createObjectURL(file.blob());
      window.open(url);
    });
  }

  private getImages(): void {
    this.images = [];
    this.document.file.forEach((file) => {
      this.fileService.getFile(file.filename).subscribe((file) => {
        this.images.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file.blob())));
      });
    });
  }
}
