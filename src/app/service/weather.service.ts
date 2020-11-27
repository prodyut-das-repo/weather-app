import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {  }

  getWeatheritemsbyCity(cityName: string): Observable<any> {
    return this.http.get(
      environment.baseUrl +
      'weather?q=' + cityName +
      '&appid=' + environment.appId +
      '&units=' + environment.units
    )
  }

  getWeatherForecast(cityName: string): Observable<any> {
    return this.http.get(
      environment.baseUrl +
      'forecast?q=' + cityName +
      '&appid=' + environment.appId +
      '&units=' + environment.units
    )
  }

}
