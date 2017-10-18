import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ContractService, IContract } from "./../services/contract.service"
import { HelperService } from "../services/helper.service";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})
export class ListItemComponent implements OnInit {
  public createdDate: string;
  @Input() document: IContract;
  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();
  constructor(
    private contractService: ContractService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.createdDate = this.helperService.convertToYMD(this.document.createdDate);
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
