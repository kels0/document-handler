import { Component, AfterViewInit } from "@angular/core";
import { DocumentService, IDocument, IOption } from "../.././services/document.service";
import "rxjs/add/operator/debounceTime.js";
import "rxjs/add/operator/distinctUntilChanged";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.less"]
})
export class SearchPageComponent implements AfterViewInit {
  private static ALL = ".*";
  public searchString: string;
  public type: string;
  public documents: IDocument[] = [];

  public options: IOption[] = [
    { name: "All", value: SearchPageComponent.ALL },
    { name: "Contract", value: "contracts" },
    { name: "Insurance", value: "insurances" },
    { name: "Receipt", value: "receipts" },
    { name: "Other", value: "others" }
  ];



  constructor(
    private documentService: DocumentService
    ) {
      this.type = this.options[0].value;
    }

  ngAfterViewInit() {
    $(".container").keypress((e) => {
      // Enter key pressed
      if (e.which === 13) {
        this.onSearch();
      }
    })
  }

  public onSearch(): void {
    const searchString = this.searchString ? this.searchString : SearchPageComponent.ALL;
    this.documentService.getDocumentByType(searchString, this.type)
    .debounceTime(1000)
    .distinctUntilChanged()
    .subscribe(
      (documents) => {
        this.documents = documents.json();
      });
  }
}
