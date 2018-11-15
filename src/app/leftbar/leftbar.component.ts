import {Component, Input, Output, OnInit} from '@angular/core';
import { IFlight } from '../../models/flight';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {
  @Input() flights: IFlight;
  @Output() searchFlights: IFlight[];
  minRange: number;
  maxRange: number;
  range: number;

  constructor() {
  }

  getMinRange() {
    this.minRange = 5;
  }

  getMaxRange() {
    this.maxRange = 100;
  }

  ngOnInit() {
    console.log(this.flights);
  }

}
