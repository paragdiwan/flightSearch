import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightService } from '../flight.service';
import { IFlight } from 'src/models/flight';
import { Response } from '@angular/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  trips: {};
  flightDetails;
  isRoundTrip: string;

  constructor(private flightService: FlightService) {
    this.trips = false;
  }

  ngOnInit() {
    this.flightService.searchResults
      .subscribe((response: any): any => {
        if (response) {
          this.flightDetails = response[0];
          const trips = response[1];
          this.isRoundTrip = this.flightDetails['isRoundTrip'];
          if (this.isRoundTrip) {
            this.trips = trips;
          } else if (!this.isRoundTrip) {
            this.trips = trips;
          }
        } else {
          this.trips = false;
        }

      });
  }

}
