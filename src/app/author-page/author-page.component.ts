import { Component, OnInit } from "@angular/core";

@Component({
  selector: "author-page",
  templateUrl: "./author-page.component.html",
  styleUrls: ["./author-page.component.less"]
})
export class AuthorPageComponent implements OnInit {
  public links: string[];

  constructor() { }

  ngOnInit() {
    this.links = [
      "https://cli.angular.io/",
      "https://www.typescriptlang.org/",
      "https://nodejs.org/en/",
      "http://getbootstrap.com/"];
  }

}
