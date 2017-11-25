import {Component } from "@angular/core";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent {
    public page: string;

    public changePage(page: string): void {
        if (page !== this.page) {
            this.page = page;
        }
    }
}
