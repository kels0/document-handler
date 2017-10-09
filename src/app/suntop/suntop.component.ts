import { Component, Output, EventEmitter, AfterViewInit } from "@angular/core";
import {HelperService} from ".././services/helper.service";
import {StationService, IStation} from ".././services/station.service";
import {OrderBy} from "../pipes/orderBy.pipe";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "sun-top",
  templateUrl: "./suntop.component.html",
  styleUrls: ["./suntop.component.less"]
})
export class SuntopComponent implements AfterViewInit {
  @Output() selectedStation: IStation;
  public stations: IStation[] = [];
  public period = "Yesterday";

  constructor(private helperService: HelperService, private stationService: StationService) {
    this.stations = this.stationService.getStations();
    this.getPeriodData(1); // default data is yesterday
  }

  ngAfterViewInit() {
    $("button").click((event) => {
      $(event.target).addClass("active").siblings().removeClass("active");
      this.period = event.target.innerHTML;
    });
  }

  public getPeriodData(days: number): void {
    let totalSeconds: number;
    this.stations.forEach((station, index) => {
      totalSeconds = 0;
      station.data.forEach((data) => {
        if (this.stationService.isInPeriod(data.date, days)) {
          totalSeconds += parseInt(data.value);
        }
      });
      this.stations[index].seconds = totalSeconds;
    });
  }

  public getPeriodDataThisMonth(): void {
    this.getPeriodDataByDate(1, new Date().getMonth());
  }

  public getPeriodDataByDate(day: number, month: number) {
    const today = new Date();
    const date = new Date(today.getFullYear(), month + 1, day).getTime();
    const numberOfDays = this.helperService.getPeriodDiff(date, today);
    this.getPeriodData(numberOfDays);
  }

  public openDetails(station: IStation): void {
    this.selectedStation = station;
  }
}
