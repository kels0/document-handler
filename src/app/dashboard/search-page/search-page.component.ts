import { Component, AfterViewInit } from "@angular/core";
import { DocumentService, IDocument, IOption } from "../.././services/document.service";
import { Constants } from "../.././constants";
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.less"],
  animations: [
    trigger("moveSearchbar", [
      state("down", style({
        transform: "translateY(0px)",
      })),
      state("up", style({
        transform: "translateY(-130px)",
      })),
      transition("down => up", animate("250ms")),
    ]),
    trigger("showResults", [
      state("hidden", style({
        opacity: "0",
        transform: "translateY(0px)",
      })),
      state("visible", style({
        opacity: "1",
        transform: "translateY(-125px)",
      })),
      transition("hidden => visible", animate("250ms")),
    ]),
  ]
})
export class SearchPageComponent implements AfterViewInit {
  private static ALL = ".*";
  public searchString: string;
  public type: string;
  public documents: IDocument[] = [];

  public options: IOption[] = [
    { name: "All", value: SearchPageComponent.ALL },
    { name: "Contract", value: this.constans.CONTRACTS },
    { name: "Insurance", value: this.constans.INSURANCES },
    { name: "Receipt", value: this.constans.RECEIPTS },
    { name: "Other", value: this.constans.OTHER }
  ];

  public stateBar = "down";
  public stateResults = "hidden";

  constructor(
    private documentService: DocumentService,
    private constans: Constants
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
        this.animateMe();
      });
  }

  public animateMe(): void {
    this.stateBar = "up";
    if (this.documents.length > 0) {
      this.stateResults = "visible";
    }
  }
}
