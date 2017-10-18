import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ContractService, IContract } from "./../services/contract.service"

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})
export class ListItemComponent implements OnInit {
  @Input() document: IContract;
  @Output() refreshPage: EventEmitter<{}> = new EventEmitter();
  constructor(private contractService: ContractService) { }

  ngOnInit() {}

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
