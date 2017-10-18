import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

export interface IContract {
  id: string;
  name: string;
  description: string;
  fileLocation: string;
  type: string;
  createdDate: string;
}

@Injectable()
export class ContractService {

  constructor(private httpService: HttpService) { }

    // get all contracts from API
  public getAllContracts(): Observable<any> {
    return this.httpService.get("/api/allContracts");
  }

    // get contracts by name from API
  public getContractByName(searchValue: string): Observable<any> {
    return this.httpService.get("/api/getContract/" + searchValue);
  }

    // add a contract via API
  public addContract(contract: IContract): Observable<any> {
    return this.httpService.post("/api/addContract", contract);
  }

  public deleteContract(id: string): Observable<any> {
    return this.httpService.delete("/api/deleteContract/" + id);
  }

  public updateContract(contract: IContract): Observable<any> {
    return this.httpService.put("/api/updateContract/", contract);
  }
}
