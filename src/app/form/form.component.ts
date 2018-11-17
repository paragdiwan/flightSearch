import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FlightService } from '../flight.service';
import 'rxjs/rx';
import { Response } from '@angular/http';
import { IFlight } from 'src/models/flight';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  trip = [];
  singleTrip = [];
  returnTrip = [];

  trips: IFlight;
  flightResponse: IFlight[];
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
  rangeSlider: any;
  selectedPrice: number;
  @Output() open: EventEmitter<any> = new EventEmitter();

  constructor(private flightService: FlightService) {
    this.isRoundTrip = false;
    this.selectedPrice = this.rangeSlider;
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

  private filterByPrice(flights: IFlight[]): IFlight[] {
    const filteredResponse = flights.filter((flight) => {
      return ((flight.fair.adult + flight.fair.child + flight.fair.infant) >= this.selectedPrice);
    });
    return filteredResponse;
  }

  private filterPriceForReturnFlight(flights?: Array<IFlight>) {
    const filteredResponse =  this.trip.filter((flight) => {
      return  flight[0].fair.adult + flight[0].fair.child + flight[0].fair.infant +
              flight[1].fair.adult + flight[1].fair.child + flight[1].fair.infant
               >= this.selectedPrice;
    });
    return filteredResponse;
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

  private getFlightDetailsFromSearchForm() {
    return {
      'departureCity': this.sourceCity,
      'destinationCity': this.destinationCity,
      'isRoundTrip': this.isRoundTrip,
      'departureDate': this.departureDate,
      'returnDate': (this.isRoundTrip ? this.returnDate : null)
    };
  }

  private handleRangeSlider() {
    let tmp = [];
    let returnTrip = [];
    let localSingleTrip = [];
    this.selectedPrice = this.rangeSlider;
    const flightDetails = this.getFlightDetailsFromSearchForm();
    if (this.flightResponse) {

      // This meant the response is already present.
      // Filter based on the slider.

      localSingleTrip = this.filterByPrice(this.singleTrip);

      if (!this.isRoundTrip) {
        localSingleTrip.map((onewayflights, index) => {
          tmp = [onewayflights, null];
          returnTrip.push(tmp);
        });
      }

      if (this.isRoundTrip) {
        returnTrip = this.filterPriceForReturnFlight();
      }

      this.flightService.searchResults
        .next([flightDetails, returnTrip]);
    }
  }

  public findFlights = (): any => {
    if (this.sourceCity && this.destinationCity) {
      const flightDetails = this.getFlightDetailsFromSearchForm();
      this.flightService.getFlights()
        .map((response: Response) => {
          let tmp;
          this.flightResponse = response.json();
          if (this.flightResponse) {
            this.flightResponse = this.sortFlights('lowToHigh', this.flightResponse);
            this.singleTrip = this.getOneWayTripResults(this.flightResponse);
            this.returnTrip = this.getRoundTripResults(this.flightResponse);
            this.trip = [];
            if (!this.isRoundTrip && this.singleTrip) {
              this.singleTrip.map((onewayflights, index) => {
                tmp = [onewayflights, null];
                this.trip.push(tmp);
              });
            } else if (this.isRoundTrip && this.returnTrip && this.singleTrip) {
              this.singleTrip.map((onewayflights, index) => {
                tmp = [onewayflights, this.returnTrip[index]];
                this.trip.push(tmp);
              });
            } else {
              return false;
            }
            return [flightDetails, this.trip];
          }
        })
        .subscribe(
          (trips: any): any => {
            this.trips = trips;
            this.flightService.searchResults.next(trips);
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
