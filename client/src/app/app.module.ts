import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { WeatherCardComponent } from './pages/weather-card/weather-card.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { AddWeatherComponent } from './pages/add-weather/add-weather.component';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './utils/interceptor/jwt.interceptor';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    DetailsComponent,
    HomeComponent,
    AddCardComponent,
    AddWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LayoutModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      maxOpened: 1
    }),
    BrowserAnimationsModule

  ],
  providers: [
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
