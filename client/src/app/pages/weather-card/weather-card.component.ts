import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { EventBusService } from 'src/app/utils/services/EventBus.service';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  darkMode = true;
  condition = 'Cloud';
  currentTemp = 16;
  minTemp = 10;
  maxTemp = 69;
  weatherData = [];

  constructor(
    private appService: AppService,
    private toastrService: ToastrService,
    private eventBusService: EventBusService
  ) { }


  ngOnInit(): void {

    this.eventBusService.on('sync-background', (data) => {
      this.darkMode = data;
    })

    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.weatherData = [];
    this.appService.fetchWeatherData()
      .subscribe(
        (response: any) => {
          if (response.data) {

            this.weatherData.push(response.data)

          } else if (response.message) {

            this.toastrService.error(response.message, "Lỗi");

          } else {

            this.toastrService.error("Đã có lỗi xảy ra. Vui lòng thử lại sau", "Lỗi");

          }
        }
      )

  }

  openDetails() {

  }

  ngOnDestroy(): void {
    this.appService.unsubcribe();
  }

}
