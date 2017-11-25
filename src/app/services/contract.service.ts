import { Injectable } from "@angular/core";
import { HttpService } from "./http.service"
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ContractService {

  constructor(private httpService: HttpService) { }

  // get all contracts from API
  public getAllContracts(): Observable<any> {
    return this.httpService.get("/contract/allContracts");
  }

  // get contracts by name from API
  public getContractByName(searchValue: string): Observable<any> {
    return this.httpService.get("/contract/getContract/" + searchValue);
  }
}
