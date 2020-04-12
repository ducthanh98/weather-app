import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, Subject, of } from 'rxjs';
import { takeUntil, catchError, switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseURL = 'http://localhost:3000/api';
  private subject$ = new Subject();
  constructor(private http: HttpClient) { }

  getWeatherByName(name: String) {
    return this.http.get(`${this.baseURL}/weather?city=${name}`)
      .pipe(
        takeUntil(this.subject$),
        catchError(error => {
          return of({ error })
        })
      )
  }

  getForcecastByName(name: String) {
    return this.http.get(`${this.baseURL}/forecast?city=${name}`)
      .pipe(
        map((result: any) => {
          result.data.list = result.data.list.splice(0, 9);
          console.log(result);
          return result;
        }),
        takeUntil(this.subject$),
        catchError(error => {
          return of({ error })
        })

      )
  }

  getWeatherByNames(names: String[]) {
    const streams$ = [];

    for (let i = 0; i < names.length; i++) {
      streams$.push(this.getWeatherByName(names[i]));
    }

    return concat(...streams$)
      .pipe(
        takeUntil(this.subject$)
      )
  }

  fetchWeatherData() {
    return this.http.get(`${this.baseURL}/auth`)
      .pipe(
        takeUntil(this.subject$),
        switchMap((response: any) => {
          return this.getWeatherByNames(response.data)
        }),
        catchError(error => {
          return of({ error })
        })
      )
  }

  fetchCities$() {
    return this.http.get(`${this.baseURL}/cities`)
      .pipe(
        takeUntil(this.subject$),
        catchError(error => {
          return of({ error })
        })
      )
  }

  updateCities(city) {
    return this.http.put(`${this.baseURL}/weather`, { city })
      .pipe(
        takeUntil(this.subject$),
        catchError(error => {
          return of({ error })
        })
      )
  }

  unsubcribe() {
    this.subject$.next();
  }
}
