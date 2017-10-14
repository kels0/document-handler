import {Component, OnInit} from "@angular/core";
import {HttpService} from ".././services/http.service";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent implements OnInit {
    public page: string;

    constructor(private httpService: HttpService) {}

    ngOnInit() {
    }

    public changePage(page: string): void {
        this.page = page;
    }
}
