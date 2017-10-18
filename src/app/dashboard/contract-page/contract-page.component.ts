import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContract } from "../.././services/contract.service";

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.less']
})
export class ContractPageComponent implements OnInit {
  @Input() documents: IContract[];
  @Output() refreshData: EventEmitter<{}> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }
  
  public refreshPage(): void {
    this.refreshData.emit();
  }

}
