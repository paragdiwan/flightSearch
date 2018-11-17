import { Component, OnInit, Input } from '@angular/core';
import { IFlight } from '../../models/flight';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements IFlight, OnInit {
  flightClass: string;
  flightId: string;
  flightName: string;
  flightDepartureDate: string;
  departureCity: string;
  destinationCity: string;
  sourceFlightDetails;
  destinationFlightDetails;
  fair: { adult: number; child: number; infant: number; totalFair: number; };
  passangers: { adults: number; children: number; infants: number; };
  @Input() trip;
  constructor() {
  }
  ngOnInit() {
  }

}
