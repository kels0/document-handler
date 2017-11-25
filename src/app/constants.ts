import { Injectable } from "@angular/core";

@Injectable()
export class Constants {
  public CONTRACTS: string;
  public RECEIPTS: string;
  public INSURANCES: string;
  public OTHER: string;

  constructor() {
    this.CONTRACTS = "contract";
    this.RECEIPTS = "receipt";
    this.INSURANCES = "insurance";
    this.OTHER = "other";
  }
}
