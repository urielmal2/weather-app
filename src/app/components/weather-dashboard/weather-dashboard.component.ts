import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {OpenWeatherMapApiService} from '../../services/openweathermap-api-requests.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, delay, distinctUntilChanged, first, map, mergeMap} from 'rxjs/operators';
import {ICityReadyData, ICityRequestData, IWeatherRespond} from '../../model/weather-params-model';
import {of, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss']
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
  noValue = 'noValue';
  noValuePattern = new RegExp(`[^${this.noValue}]`, 'g');
  citiesList = ['Kyiv', 'Tel Aviv'];
  weatherFormGroup: FormGroup;
  citiesFormFields = {
    city: [this.noValue, [Validators.pattern(this.noValuePattern)]],
    units: ['', [Validators.required, Validators.pattern(/(^|\s*)standard(\s*|$)|(^|\s*)metric(\s*|$)|(^|\s*)imperial(\s*|$)/i)]]
  };
  currentWeather: IWeatherRespond[] = [];
  cityReady = new Subject<any>();
  cityReadySubscribe: Subscription;


  constructor(private openWeatherMapApiService: OpenWeatherMapApiService,
              private fb: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.weatherFormGroup = this.fb.group({
      citesArray: this.fb.array([this.fb.group(this.citiesFormFields)])
    });

    this.debounceWeatherRequestInit();
  }

  ngOnDestroy(): void {
    this.cityReadySubscribe?.unsubscribe();
  }

  get citesArray() {
    return this.weatherFormGroup.get('citesArray') as FormArray;
  }

  addCity() {
    this.citesArray.push(this.fb.group(this.citiesFormFields));
  }

  getWeather(data: ICityRequestData, index): void {
    this.openWeatherMapApiService.getCityWeather(data.city, data.units).pipe(map((value: IWeatherRespond) => {
      this.currentWeather[index] = value;
      this.changeDetectorRef.detectChanges();
    }), first()).subscribe();
  }

  debounceWeatherRequestInit(): void {
    this.cityReadySubscribe = this.cityReady.pipe(
      map((event: ICityReadyData) => {
        return event;
      }),
      debounceTime(10),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(10),
      )),
    ).subscribe((cityReadyData: ICityReadyData) => {
      this.getWeather(cityReadyData?.data, cityReadyData?.index);
    });
  }
}
