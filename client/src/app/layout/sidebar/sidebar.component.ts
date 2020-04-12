import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../utils/services/EventBus.service';
import { EventData } from '../../utils/model/EventData';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {
  showMenu = false;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    
    this.eventBusService.on('sync-sidebar',(data)=>{
      this.showMenu = data;
    })

  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
    this.eventBusService.emit(new EventData('sync-header', this.showMenu));
  }

}
