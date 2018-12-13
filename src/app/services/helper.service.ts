import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IDocument } from "./document.service";

@Injectable()
export class HelperService {
  private documentUpdatedSource = new BehaviorSubject<IDocument>(null);
  private documentDeletedSource = new BehaviorSubject<IDocument>(null);
  public updatedDocument = this.documentUpdatedSource.asObservable();
  public deletedDocument = this.documentDeletedSource.asObservable();

  public updateDocuments(document: IDocument) {
    this.documentUpdatedSource.next(document)
  }

  public deleteDocument(document: IDocument) {
    this.documentDeletedSource.next(document);
  }

  // More UI friendly time
  public secondsToTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s >= 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  public getDate(): number {
    return new Date().getTime();
  }

  // More UI friendly date
  public convertToYMD(timestamp: number): string {
    const date = new Date(timestamp);
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  }

  // Get the difference in days between two dates
  public getPeriodDiff(date: number, today: Date) {
    const timeDifference = Math.abs(date - today.getTime());
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return numberOfDays;
  }

  public generateId(): string {
    return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" +
      this.s4() + "-" + this.s4() + this.s4() + this.s4();
  }

  private s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
