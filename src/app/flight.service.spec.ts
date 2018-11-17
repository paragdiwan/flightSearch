import { TestBed } from '@angular/core/testing';
import { FlightService } from './flight.service';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment} from '../environments/environment';



describe('FlightService', () => {
  const mockFlights = [{
    'arrivalTime': '9:00AM',
    'departureCity': 'Kolkatta',
    'departureTime': '7:00AM',
    'destinationCity': 'Delhi',
    'fair': {
      'adult': 10000,
      'child': 4343,
      'infant': 1000,
      'totalFair': 0
    },
    'flightClass': 'business',
    'flightDepartureDate': '2018-11-17',
    'flightId': '0121012',
    'flightName': 'AI1991'
  },
  {
      'arrivalTime': '2:30PM',
      'departureCity': 'Delhi',
      'departureTime': '11:00AM',
      'destinationCity': 'Kolkatta',
      'fair': {
        'adult': 1020,
        'child': 400,
        'infant': 100,
        'totalFair': 0
      },
      'flightClass': 'business',
      'flightDepartureDate': '2018-11-24',
      'flightId': '1212121',
      'flightName': 'JW1991'
  }];

  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule],
      providers: [FlightService]
    }
  ));

  it('should be created', () => {
    const service: FlightService = TestBed.get(FlightService);
    expect(service).toBeTruthy();
  });

  it(`should issue a request`,
    // 1. declare as async test since the HttpClient works with Observables
    async(
      // 2. inject HttpClient and HttpTestingController into the test
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        // 3. send a simple request

        http.get(`${environment.flightAPI}`).subscribe();

        // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
        // here two, it's significantly less boilerplate code needed to verify an expected request
        backend.expectOne({
          url: `${environment.flightAPI}`,
          method: 'GET'
        });

        backend.match({
          url: `${environment.flightAPI}`,
          method: 'GET'
        })[0].flush(mockFlights);
      })
    )
  );
});
