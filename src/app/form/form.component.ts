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
  trip = [];
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
    this.isRoundTrip = false;
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

  private sortFlights(criteria: string = 'lowToHigh', flights: IFlight[]) {
    if (criteria === 'lowToHigh') {
      return flights.sort(
        (a: IFlight, b: IFlight) => {
          return a.fair.adult - b.fair.adult;
        });
    } else {
      return flights.sort(
        (a: IFlight, b: IFlight) => {
          return b.fair.adult - a.fair.adult;
        });
    }
  }

  private getOneWayTripResults = (flights): IFlight[] => {
    const filteredResult = flights.filter((flight) => {
      return flight.departureCity.toLowerCase() === this.sourceCity.toLowerCase() &&
        flight.destinationCity.toLowerCase() === this.destinationCity.toLowerCase() &&
        flight.flightDepartureDate === this.departureDate;
    });
    return filteredResult.length ? filteredResult : null;
  }

  private getRoundTripResults = (flights): IFlight[] => {
    const filteredResult = flights.filter((flight) => {
      return flight.destinationCity.toLowerCase() === this.sourceCity.toLowerCase() &&
        flight.departureCity.toLowerCase() === this.destinationCity.toLowerCase() &&
        flight.flightDepartureDate === this.returnDate;
    });
    return filteredResult.length ? filteredResult : null;
  }


  public findFlights = (): any => {
    if (this.sourceCity && this.destinationCity) {
      this.flightService.getFlights()
        .map((response: Response) => {
          let flights: IFlight[] = response.json();
          let singleTrip = [];
          let returnTrip = [];
          let tmp;
          flights = this.sortFlights('lowToHigh', flights);
          const flightDetails = {
            'departureCity': this.sourceCity,
            'destinationCity': this.destinationCity,
            'isRoundTrip': this.isRoundTrip,
            'departureDate': this.departureDate,
            'returnDate': (this.isRoundTrip ? this.returnDate : null)
          };
          this.trip = [];
          singleTrip = this.getOneWayTripResults(flights);
          if (!this.isRoundTrip) {
            singleTrip.map((onewayflights, index) => {
              tmp = [onewayflights, null];
               this.trip.push(tmp);
             });
          } else {
            returnTrip = this.getRoundTripResults(flights);
            singleTrip.map((onewayflights, index) => {
             tmp = [onewayflights, returnTrip[index]];
              this.trip.push(tmp);
            });
          }
          return [flightDetails, this.trip];
        })
        .subscribe(
          (trip: any): any => {
            this.flightService.searchResults.next(trip);
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
