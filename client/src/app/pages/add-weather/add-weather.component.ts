import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css']
})
export class AddWeatherComponent implements OnInit {
  selectedCity = '';
  capitals = [];
  showNote = false;
  state = 'Clouds';
  temp = 0;
  followedCM = false;
  city = 'HaNoi'
  curDate = (new Date()).toDateString();
  constructor(private appService: AppService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.fetchCities();
    this.getWeather('HaNoi');
  }

  selectCity(city) {
    this.selectedCity = city;
    this.getWeather(this.selectedCity);
  }

  getWeather(city) {
    this.appService.getWeatherByName(city)
      .subscribe(
        (response: any) => {
          if (response.data) {

            this.state = response.data.weather[0].main;
            this.temp = response.data.main.temp;
            this.city = response.data.name;
            this.followedCM = false;

          }
        }
      )
  }

  fetchCities() {
    this.capitals = [];

    this.appService.fetchCities$()
      .subscribe(
        (response: any) => {

          if (response.data) {

            for (let i = 0; i < response.data.length; i++) {
              this.capitals.push(response.data[i].capital);
            }

          } else {
            this.toastrService.error(response.error.message, 'Lỗi');
          }

        }
      )
  }

  followCity() {
    this.appService.updateCities(this.city)
      .subscribe(
        (response: any) => {

          if (response.data) {

            this.toastrService.success('Thành công');
            this.followedCM = true;

          } else if (response.message) {
            this.toastrService.error(response.message, 'Lỗi');
          } else {
            this.toastrService.error("Đã có lỗi xảy ra. Vui lòng thử lại sau", 'Lỗi');
          }

        }
      )
  }

}
