import { Component, OnInit, Input } from "@angular/core";
import {HelperService} from "../.././services/helper.service";
import {IStation} from "../.././services/station.service";

@Component({
  selector: "station-card",
  templateUrl: "./station-card.component.html",
  styleUrls: ["./station-card.component.less"]
})
export class StationCardComponent implements OnInit {
  @Input() station: IStation;
  constructor(private helperService: HelperService) { }

  ngOnInit() { }

  // Used in template to convert to better time
  public convertToDate(seconds: number): string {
    return this.helperService.secondsToTime(seconds);
  }

}
