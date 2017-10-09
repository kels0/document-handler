import { Component, OnInit, Input } from "@angular/core";
import {IStation, IStationValue} from ".././services/station.service";
import {HelperService} from ".././services/helper.service";
import {OrderBy} from "../pipes/orderBy.pipe";

@Component({
  selector: "station-details",
  templateUrl: "./station-details.component.html",
  styleUrls: ["./station-details.component.less"]
})
export class StationDetailsComponent implements OnInit {
  @Input() station: IStation;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  // Used in template to convert to more ui friendly list
  public convertToStatistics(hour: IStationValue): string {
    const date = new Date(hour.date);
    const YMD = this.helperService.convertToYMD(date);
    const dateOfMeasure = YMD + " " + date.getHours() + ":00";
    const valueOfMeasure = Math.floor(parseInt(hour.value) / 60);
    return dateOfMeasure + " - " + valueOfMeasure + " minutes of sun.";
  }
}
