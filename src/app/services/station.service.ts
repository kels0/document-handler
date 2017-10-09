import { Injectable } from "@angular/core";
import {HttpService} from "./http.service";

interface IDataResponse {
    period: IPeriodResponse;
    station: IStationResponse[];
}

interface IPeriodResponse {
    from: number;
    to: number;
    key: string;
    summary: string;
    sampling: string;
}

interface IStationResponse {
    key: string;
    name: string;
    from: number;
    to: number;
    value: IStationValue[];
}

export interface IStationValue {
    date: number;
    value: string;
}

interface IPosition {
  longitude: number;
  latitude: number;
}

// Single station response
interface IDataStationResponse {
    period: IPeriodResponse;
    position: IPosition;
    station: {
        key: string;
        name: string;
    };
    value: IStationValue[];
}

export interface IStation {
    name: string;
    seconds: number;
    position: IPosition;
    data: IStationValue[];
}

@Injectable()
export class StationService {
  private stations: IStation[] = [];
  private maxDate: number;
  private minDate: number;

  constructor(private httpService: HttpService) { }

  // Get the stations from the API and set a service variable so it
  // can be fetched anytime
  public setStations(): void {
    this.stations = [];
    this.httpService.getStations().subscribe(response => {
        const result: IDataResponse = JSON.parse(response.text());
        result.station.forEach((station, index) => {
          this.setStationData(station, "latest-months");
        });
    });
  }

  // Check if data is in period, used also in top-sun
  public isInPeriod(dateToCheck: number, days: number): boolean {
    const fromPeriod = new Date().getTime() - (days * 24 * 60 * 60 * 1000); // default is yesterday
    if (fromPeriod < dateToCheck) {
      return true;
    }
    return false;
  }

  // Get each station and its data, put it in the service variable
  private setStationData(station: IStationResponse, period: string): void {
    this.httpService.getStation(station.key, period).then((response) => {
      const result: IDataStationResponse = JSON.parse(response.text());
      let totalSeconds = 0;
      this.minDate = result.value[0].date; // Initiate with first value
      this.maxDate = result.value[0].date;
      result.value.forEach((data) => {
        if (this.isInPeriod(data.date, 1)) {
          totalSeconds += parseInt(data.value);
        }
        this.getMaxMinValues(data.date);
      });

      this.stations.push({
        name: station.name.replace(" Sol", ""),
        position: result.position[0],
        seconds: totalSeconds,
        data: result.value
      });
    });
  }

  // Get the max and min date of the data
  private getMaxMinValues(date: number): void {
    if (date < this.minDate) {
      this.minDate = date;
    } else if (date > this.maxDate) {
      this.maxDate = date;
    }
  }

  // Public method to get the max date
  public getMaxDate(): number {
    return this.maxDate;
  }

  // Public method to get the min date
  public getMinDate(): number {
    return this.minDate;
  }

  // Public method to get the stations
  public getStations(): IStation[] {
    return this.stations;
  }
}
