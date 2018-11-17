import {Component, Input, Output, OnInit} from '@angular/core';
import { IFlight } from '../../models/flight';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {
  @Input() flights: IFlight;
  @Output() searchFlights: IFlight[];
  constructor() {
  }

  ngOnInit() {
  }

}
