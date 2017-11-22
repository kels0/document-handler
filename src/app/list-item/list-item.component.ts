import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ContractService, IContract } from "./../services/contract.service"
import { HelperService } from "../services/helper.service";
import { FileService } from "../services/file.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})
export class ListItemComponent implements OnInit {
  public createdDate: string;
  public file: any;
  @Input() document: IContract;
  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();

  constructor(
    private contractService: ContractService,
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.createdDate = this.helperService.convertToYMD(this.document.createdDate);
    const fileName = this.document.file[0].filename;
    this.fileService.getFile(fileName).subscribe((file) => {
      this.file = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file.blob()));
    });
  }

  public deleteDocument(): void {
    this.contractService.deleteContract(this.document.id)
      .toPromise()
      .then(() => {
        this.updateData();
      });
  }

  public updateData(): void {
    this.refreshPage.emit();
  }
}
