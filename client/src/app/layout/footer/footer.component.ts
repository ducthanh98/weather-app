import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/utils/services/EventBus.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  darkModeActive = true;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.eventBusService.on('sync-background', (data) => {
      this.darkModeActive = data;
    })
  }

}
