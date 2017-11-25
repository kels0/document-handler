import { Injectable } from "@angular/core";
import { HttpService } from "./http.service"
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/toPromise";


@Injectable()
export class ReceiptsService {

  constructor(private httpService: HttpService) { }

    // get all contracts from API
  public getAllReceipts(): Observable<any> {
    return this.httpService.get("/receipts/allReceipts");
  }

    // get contracts by name from API
  public getReceiptByName(searchValue: string): Observable<any> {
    return this.httpService.get("/receipts/getReceipts/" + searchValue);
  }
}
