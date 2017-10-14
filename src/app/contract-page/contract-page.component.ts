import { Component, OnInit } from '@angular/core';
import {HttpService} from ".././services/http.service";

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.less']
})
export class ContractPageComponent implements OnInit {
  public contracts = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getContracts();
  }

  private getContracts(): void {
    this.httpService.getAllContracts().subscribe(
      (response) => {this.contracts = response.json();},
      (error) => {console.log(error)},
      () => {console.log("finish subscription")}
    );
  }
}
