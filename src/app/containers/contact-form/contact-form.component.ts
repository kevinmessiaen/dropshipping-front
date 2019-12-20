import { Component, OnInit } from "@angular/core";
import { City } from "src/app/models/City";
import { Observable, of } from "rxjs";
import { CityService } from "src/app/services/city.service";
import { isDefined } from "@angular/compiler/src/util";
import { first } from "rxjs/operators";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"]
})
export class ContactFormComponent implements OnInit {
  cities$: Observable<City[]>;
  selectedCity: number = -1;
  city: City;
  postCode: string;

  constructor(private cityService: CityService) {}

  ngOnInit() {}

  postCodeChanged(event) {
    if (!/^[0-9]{0,5}$/.test(event.target.value)) {
      event.target.value = event.target.value.replace(/\D/g, "");
    } else if (event.target.value.length >= 2) {
      this.cities$ = this.cityService.findCityByPostCode(event.target.value);
      this.cities$.subscribe(cities => {
        if (cities.length === 1) {
          this.selectedCity = cities[0].id;
          this.city = cities[0];
          if (event.target.value.length > this.postCode.length) {
            let codes: string[] = this.city.codes.filter(c =>
              c.startsWith(event.target.value)
            );
            if (codes.length === 1) event.target.value = codes[0];
          }
        } else if (!isDefined(cities.find(c => c.id === this.selectedCity)))
          this.selectedCity = -1;
      });
    } else {
      this.selectedCity = -1;
      this.cities$ = of([]);
    }
  }

  async onSelectCity(newValue) {
    this.selectedCity = newValue;
    this.city = (await this.cities$.pipe(first()).toPromise()).find(
      c => c.id == newValue
    );
    this.postCode = this.city.codes[0];
  }
}
