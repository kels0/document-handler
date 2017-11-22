import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

export interface IContract {
  id: string;
  name: string;
  description: string;
  file: IFile[];
  type: string;
  createdDate: number;
}

export interface IFile {
  originalname: string;
  filename: string;
  mimetype: string;
  path: string;
}

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

    // add a contract via API
  public addContract(contract: IContract): Observable<any> {
    return this.httpService.post("/contract/addContract", contract);
  }

  public deleteContract(id: string): Observable<any> {
    return this.httpService.delete("/contract/deleteContract/" + id);
  }

  public updateContract(contract: IContract): Observable<any> {
    return this.httpService.put("/contract/updateContract/", contract);
  }
}
