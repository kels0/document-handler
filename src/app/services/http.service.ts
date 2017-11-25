import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

  public put(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }
}
