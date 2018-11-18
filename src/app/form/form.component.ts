import { Component, OnInit, EventEmitter } from '@angular/core';
import { FlightService } from '../flight.service';
import { Response } from '@angular/http';
import { IFlight } from 'src/models/flight';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  trip = [];
  singleTrip = [];
  returnTrip = [];
  today: string;
  changeType: string; // change the input type from text to date.

  trips: IFlight;
  flightResponse;
  adults: number;
  childs: number;
  infants: number;
  sourceCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
  isRoundTrip: boolean;
  rangeSlider: any;
  selectedPrice: number;


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
  // Data structure : [ongoing, null] as no return flight required.
  private filterByPrice(flights: IFlight[]): IFlight[] {
    const filteredResponse = flights.filter((flight) => {
      return ((flight.fair.adult + flight.fair.child + flight.fair.infant) >= this.selectedPrice);
    });
    return filteredResponse;
  }

  // @TODO: Can be enhanced by multiplying with selected combination of adult,infant etc.
  // to show actual prices.
  // Data structure: [ongoing, return] that represents 1 Flight.
  private filterPriceForReturnFlight(flights?: Array<IFlight>) {
    const filteredResponse = this.trip.filter((flight) => {
      return flight[0].fair.adult + flight[0].fair.child + flight[0].fair.infant +
        flight[1].fair.adult + flight[1].fair.child + flight[1].fair.infant
        >= this.selectedPrice;
    });
    return filteredResponse;
  }

  // sort flights based on criteria.
  // Ideally take MIN & MAX limit & pass it to slider that will contain
  // exact values.

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
  // Find Oneway flights based on current search criteria.

  private getOneWayTripResults = (flights): IFlight[] => {
    const filteredResult = flights.filter((flight) => {
      return flight.departureCity.toLowerCase() === this.sourceCity.toLowerCase() &&
        flight.destinationCity.toLowerCase() === this.destinationCity.toLowerCase() &&
        flight.flightDepartureDate === this.departureDate;
    });
    return filteredResult.length ? filteredResult : null;
  }

  // Return flights are same as Oneway flights
  // only thing it's departure date == return date.

  private getRoundTripResults = (flights): IFlight[] => {
    const filteredResult = flights.filter((flight) => {
      return flight.destinationCity.toLowerCase() === this.sourceCity.toLowerCase() &&
        flight.departureCity.toLowerCase() === this.destinationCity.toLowerCase() &&
        flight.flightDepartureDate === this.returnDate;
    });
    return filteredResult.length ? filteredResult : null;
  }

  private getFlightDetailsFromSearchForm(): Object {
    return {
      'departureCity': this.sourceCity,
      'destinationCity': this.destinationCity,
      'isRoundTrip': this.isRoundTrip,
      'departureDate': this.departureDate,
      'returnDate': (this.isRoundTrip ? this.returnDate : null)
    };
  }

  // Slider handler.
  // @TODO: PIPES can be used to filter data.
  private handleRangeSlider(): any {
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
        .next([ flightDetails , returnTrip ]);
    }
  }

  private disablePastDate() {
    this.changeType = 'date';
    const dtToday = new Date();
    let month: any = dtToday.getMonth() + 1;
    let day: any = dtToday.getDate();
    const year = dtToday.getFullYear();
    if (month < 10) {
      month = '0' + month.toString();
    }
    if (day < 10) {
      day = '0' + day.toString();
    }
    this.today = year + '-' + month + '-' + day;
  }


  public findFlights = (): any => {
    if (this.sourceCity && this.destinationCity) {
      const flightDetails = this.getFlightDetailsFromSearchForm();
      this.flightService.getFlights()
        .pipe(
          map((response: Response) => {
          let tmp;
          this.flightResponse = response;
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
        )
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
