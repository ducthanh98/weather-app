import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  darkMode = true;
  weatherData: any = {};
  daysForecast = []
  city = '';
  wind = '';
  hum = '';
  state = '';
  temp = '';
  constructor(
    private appService: AppService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.params.city;
    this.getWeatherInfo();
  }

  getWeatherInfo() {

    zip(this.appService.getWeatherByName(this.city),
      this.appService.getForcecastByName(this.city)
    ).subscribe(
      (response: any) => {

        if (response[0].data && response[1].data) {
          this.weatherData = response[0].data;
          this.daysForecast = response[1].data.list;
        } else {
          this.toastrService.error("Đã có lỗi xảy ra. Vui lòng thử lại sau")
        }

      }
    )

  }

}
