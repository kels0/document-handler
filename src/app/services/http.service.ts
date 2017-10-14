import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  // get the the files from API
  public getAllContracts() {
    return this.http.get("/api/allContracts");
  }

    // get the the files from API
  public postContract(contract: any) {
    return this.http.post("/api/addContract", contract);
  }

}
