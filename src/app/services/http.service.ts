import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  // Get one single station from API
  public getStation(stationKey: string, period: string): Promise<any> {
    return this.http.get("/api/station/" + stationKey + "/" + period).toPromise();
  }

  // get the stations from API
  public getStations() {
    return this.http.get("/api/stations");
  }

}
