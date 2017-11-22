import { Component, AfterViewInit } from '@angular/core';
import { ContractService, IContract } from "../.././services/contract.service";
import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements AfterViewInit {
  public searchString: string;
  public documents: IContract[] = [];
  
  constructor(private contractService: ContractService) { }

  ngAfterViewInit() {
    $(".container").keypress((e) => {
      //Enter key pressed
      if(e.which == 13) {
        this.onSearch();
      }
    })
  }

  public onSearch(): void {
    this.contractService.getContractByName(this.searchString)
    .debounceTime(1000)
    .distinctUntilChanged()
    .subscribe(
      (response) => {this.documents = response.json(); },
      (error) => {console.log(error)},
      () => {console.log("Subscription finished")}
    );
  }
}
