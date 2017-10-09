import {Component, OnInit} from "@angular/core";
import {StationService} from ".././services/station.service";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"],
})

export class DashboardComponent implements OnInit {
    public page: string;

    constructor(private stationService: StationService) {}

    ngOnInit() {
        this.stationService.setStations(); // Set stations to application
    }

    public changePage(page: string): void {
        this.page = page;
    }
}
