import { Injectable } from "@angular/core";
import { HttpService } from "./http.service"
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/toPromise";


@Injectable()
export class InsuranceService {

  constructor(private httpService: HttpService) { }

    // get all contracts from API
  public getAllInsurances(): Observable<any> {
    return this.httpService.get("/insurance/allInsurances");
  }

    // get contracts by name from API
  public getInsuranceByName(searchValue: string): Observable<any> {
    return this.httpService.get("/insurance/getInsurance/" + searchValue);
  }

}
