import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {IWeatherRespond, WeatherUnits} from '../model/weather-params-model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenWeatherMapApiService {

  appId = '0d7303c17ee3d3482cd82a2ad273a90d';
  apiUrl = 'http://localhost:4200/api';

  constructor(private httpService: HttpService) {
  }

  getCityWeather(cityName: string, units: WeatherUnits): Observable<IWeatherRespond> {
    const requestOptions = {q: cityName, units, appid: this.appId};
    return this.httpService.get(`${this.apiUrl}/weather`, requestOptions);
  }
}
