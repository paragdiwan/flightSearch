import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { IFlight } from 'src/models/flight';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  flights: IFlight;
  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.flightService.searchResults
      .subscribe((data) => {
        // this.flights = data;
        console.log(data);
      });
  }

}
