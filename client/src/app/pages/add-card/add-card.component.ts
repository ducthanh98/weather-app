import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/utils/services/EventBus.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  darkMode = true;
  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {

    this.eventBusService.on('sync-background', (data) => {
      this.darkMode = data;
    })

  }

}
