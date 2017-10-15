import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.less']
})
export class AddNewComponent implements OnInit {
  public selectedType: string;
  public documentTitle: string;
  public documentDescription: string;
  public document: any;

  public options = [
    { name: "Contract", value: "contracts" }, 
    { name: "Insurance", value: "insurances" }, 
    { name: "Receipt", value: "receipts" }, 
    { name: "Other", value: "others" }
  ];

  constructor(
    private httpService: HttpService,
    private HelperService: HelperService
  ) { 
    this.selectedType = this.options[0].value;
  }

  ngOnInit() {
  }

  public addDocument(): void {
    this.document = {
      id: this.HelperService.generateId(),
      name: this.documentTitle,
      type: this.selectedType,
      description: this.documentDescription
    };

    this.httpService.postContract(this.document).subscribe(
      (response) => {console.log(response);},
      (error) => {console.log(error);},
      () => {console.log("Finish Subscription")}
    );
  }
}
