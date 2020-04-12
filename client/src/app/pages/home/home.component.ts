import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../utils/services/EventBus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  darkModeActive = true;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {

    this.eventBusService.on('sync-background', (data) => {
      this.darkModeActive = data;
    })

  }

}
