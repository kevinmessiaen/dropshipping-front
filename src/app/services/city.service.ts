import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Observable } from "rxjs";
import { City } from "../models/City";

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(private dataService: DataService) {}

  findCityByPostCode(postCode: string): Observable<City[]> {
    return this.dataService.findCityByPostCode(postCode);
  }
}
