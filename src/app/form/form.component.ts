import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import 'rxjs/rx';
import { Response } from '@angular/http';
import { IFlight } from 'src/models/flight';
import { filter } from 'rxjs-compat/operator/filter';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  adults: number;
  childs: number;
  infants: number;
  sourceCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
  isRoundTrip: boolean;
  souceFlights: IFlight[];
  destinationFlights: IFlight[];


  constructor(private flightService: FlightService) {
    this.flightService.activeTab
      .subscribe((activeTab: string) => {
        if (activeTab.toLowerCase() === 'one way') {
          this.isRoundTrip = false;
        } else if (activeTab.toLowerCase() === 'return') {
          this.isRoundTrip = true;
        } else {
          this.isRoundTrip = false;
        }
      });
  }

  private getOneWayTripResult = (flights): IFlight[] => {
   const filteredResult = flights.filter((flight) => {
      return flight.departureCity.toLowerCase() === this.sourceCity.toLowerCase() &&
        flight.destinationCity.toLowerCase() === this.destinationCity.toLowerCase() &&
        flight.flightDepartureDate === this.departureDate;
    });
    return filteredResult;
  }

  private getRoundTripResults = (flights): IFlight[] => {
    const filteredResult = flights.filter((flight) => {
        return flight.destinationCity.toLowerCase() === this.sourceCity.toLowerCase() &&
        flight.departureCity.toLowerCase() === this.destinationCity.toLowerCase() &&
        flight.flightDepartureDate === this.returnDate;
    });
    return filteredResult;
  }


  public findFlights = () => {
    if (this.sourceCity && this.destinationCity) {
      this.flightService.getFlights()
        .map((response: Response) => {
          const flights: IFlight[] = response.json();
          const result = {
            singleTrip: [],
            returnTrip: []
          };
          if (!this.isRoundTrip) {
            result.singleTrip.push(this.getOneWayTripResult(flights));
          } else {
            result.singleTrip.push(this.getOneWayTripResult(flights));
            result.returnTrip.push(this.getRoundTripResults(flights));
          }
          return result;
        })
        .subscribe(
          (flights: any): any => {
            this.flightService.searchResults.next(flights);
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log('Flights fetched successfully...');
          });
    }
  }

  ngOnInit() {
  }

}
