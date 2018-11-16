import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightService } from '../flight.service';
import { IFlight } from 'src/models/flight';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  trips: {};
  flightDetails: [];
  isRoundTrip: string;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.flightService.searchResults
      .subscribe((response: any) => {
        this.trips = '';
        console.log(response);
        this.flightDetails = response[0];
        const trips = response[1];
        console.log(trips);
        this.isRoundTrip = this.flightDetails['isRoundTrip'];
        if (this.isRoundTrip ) {
          this.trips = trips;
        } else if (!this.isRoundTrip) {
          this.trips = trips;
        }

      });
  }

  ngOnDestroy() {
    console.log('here');
  }


}
