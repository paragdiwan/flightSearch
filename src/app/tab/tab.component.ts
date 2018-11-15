import { Component, OnInit, Input } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() tabs;
  tabNames: Array<string>;
  activeTab: string;

  loadTabView(activeTab): void {
    this.flightService.activeTab.next(activeTab);
    this.activeTab = activeTab;
  }

  constructor(private flightService: FlightService) {
    this.tabNames = ['One way', 'Return'];
    this.activeTab = 'One way';
  }

  ngOnInit() {
  }

}
