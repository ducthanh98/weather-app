import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../utils/services/EventBus.service';
import { EventData } from '../../utils/model/EventData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  darkModeActive = true;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {

    this.eventBusService.on('sync-header',(data)=>{
      this.showMenu = data;
    })

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.eventBusService.emit(new EventData('sync-sidebar', this.showMenu));
  }


  modeToggleSwitch(): void {
    this.darkModeActive = !this.darkModeActive;
    this.eventBusService.emit(new EventData('sync-background', this.darkModeActive));

  }

}
