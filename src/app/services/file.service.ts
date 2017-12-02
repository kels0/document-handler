import { Injectable } from "@angular/core";
import { HttpService } from "./http.service"
import { ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Rx";

export interface IFile {
  originalname: string;
  filename: string;
  mimetype: string;
  path: string;
}

@Injectable()
export class FileService {

  constructor(private httpService: HttpService) { }

  public uploadFile(file: FormData): Observable<any> {
    return this.httpService.post("file/", file);
  }

  public getFile(value: string): Observable<any> {
    return this.httpService.get("file/" + value, {
      responseType: ResponseContentType.Blob
    });
  }

  public deleteFile(value: string): Observable<any> {
    return this.httpService.delete("file/" + value);
  }
}
