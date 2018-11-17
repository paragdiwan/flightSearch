import { Component, OnInit, Input } from '@angular/core';
import { IFlight } from '../../models/flight';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements IFlight, OnInit {
  arrivalTime: string;
  flightId: string;
  departureTime: string;
  flightName: string;
  flightDepartureDate: string;
  departureCity: string;
  destinationCity: string;
  fair: { adult: number; child: number; infant: number; totalFair: number; };

  // In case one way 'trip' contains only single object whereas
  // in 'return' trip , it contains a [oneway,twoway] object.

  @Input() trip: Array<any>;

  constructor() {
  }
  ngOnInit() {
  }


}
