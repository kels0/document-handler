import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { StationService, IStation } from ".././services/station.service";
import { HelperService } from ".././services/helper.service";
import { OrderBy } from "../pipes/orderBy.pipe";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "sun-league",
  templateUrl: "./sun-league.component.html",
  styleUrls: ["./sun-league.component.less"]
})
export class SunLeagueComponent implements AfterViewInit {
  public stations: IStation[] = [];
  public filtredStations: IStation[] = [];
  public maxDate: string;
  public minDate: string;
  private fromDate: number = new Date().getTime() - (1 * 24 * 60 * 60 * 1000); // yesterday
  private toDate: number = new Date().getTime();
  private selectionStation = "All";

  constructor(private stationService: StationService, private helperService: HelperService) {
    this.stations = this.filtredStations = this.stationService.getStations();
    this.setMaxMinDate();
    this.getPeriodData(); // default data is yesterday
  }

  ngAfterViewInit() {
    this.initializeDatepickers();
    this.initializeSelect();
  }

  private initializeDatepickers() {
    const fromDatepicker = $("#datetimepicker-from");
    const toDatepicker = $("#datetimepicker-to");
    // Initialize the date pickers
    fromDatepicker.datetimepicker();
    toDatepicker.datetimepicker();

    fromDatepicker.on("dp.change", (e) => {
      this.fromDate = e.date._d; // get date from event
    });

    toDatepicker.on("dp.change", (e) => {
      this.toDate = e.date._d; // get date from event
    });
  }

  private initializeSelect(): void {
    $("#select-station").on("change", (event) => {
      this.selectionStation = $(event.target).find("option:selected").val();
    });
  }

  private isInPeriod(dateToCheck: number): boolean {
    const isAboveFromDate = this.fromDate < dateToCheck;
    const isBelowToDate = dateToCheck < this.toDate;

    if (isAboveFromDate && isBelowToDate) {
      return true;
    }
    return false;
  }

  public getPeriodData(): void {
    this.stations.forEach((station, index) => {
      if (this.selectionStation === "All") {
        this.filtredStations = this.stations;
        this.setDataStation(station, index);
      } else if (this.selectionStation === station.name) {
        this.filtredStations = [];
        this.filtredStations.push(station);
        this.setDataStation(station, 0);
      }
    });
  }

  private setDataStation(station: IStation, index: number): void {
    let totalSeconds = 0;
    station.data.forEach((data) => {
      if (this.isInPeriod(data.date)) {
        totalSeconds += parseInt(data.value);
      }
    });
    this.filtredStations[index].seconds = totalSeconds;
  }

  public setMaxMinDate(): void {
    this.maxDate = this.helperService.convertToYMD(new Date(this.stationService.getMaxDate()));
    this.minDate = this.helperService.convertToYMD(new Date(this.stationService.getMinDate()));
  }

}
