import { Injectable } from "@angular/core";
import { HttpService } from "./http.service"
import { Observable } from "rxjs/Rx";
import { IFile } from "./file.service";
import "rxjs/add/operator/toPromise";

export interface IOption {
  name: string;
  value: string;
}
export interface IDocument {
  id: string;
  name: string;
  description: string;
  file: IFile[];
  type: string;
  createdDate: number;
}

@Injectable()
export class DocumentService {

  constructor(private httpService: HttpService) { }
    // add a contract via API
  public addContract(contract: IDocument): Observable<any> {
    return this.httpService.post("/document/addDocument", contract);
  }

  public deleteContract(id: string): Observable<any> {
    return this.httpService.delete("/document/deleteDocument/" + id);
  }

  public updateContract(contract: IDocument): Observable<any> {
    return this.httpService.put("/document/updateDocument/", contract);
  }

  public getDocumentByType(searchValue: string, type: string): Observable<any> {
    return this.httpService.get("/document/getDocument/" + searchValue + "/" + type);
  }
}
